import { Request, Response } from "express"
import Venta from "../models/Venta"
import Producto from "../models/Producto"
import VentaProducto from "../models/VentaProducto"
import db from "../config/database"
import { AuthRequest } from "../middleware/auth"
import VentaServicio from "../models/VentaServicio"
import Servicio from "../models/Servicio"
import Agenda from "../models/Agenda"

export const getVentas = async (request: Request, response: Response) => {
    const venta = await Venta.findAll()
    response.json({data:venta})
}

export const getVentaByID = async (req: Request, res: Response) => {
  const { codVenta } = req.params;

  const venta = await Venta.findByPk(codVenta);
  if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

  const agenda = await Agenda.findOne({ where: { codVenta } });

  res.json({
    data: {
      ...venta.toJSON(),
      codAgenda: agenda?.codAgenda || null
    }
  });
};


export const getVentasCliente = async (req: AuthRequest, res: Response) => {
  try {
    const rutCliente = req.user?.rut;

    if (!rutCliente) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const ventas = await Venta.findAll({
      where: { rutCliente },
      order: [["fecha", "DESC"]],
      include: [
        {
          model: VentaServicio,
          as: "detalles",
          include: [
            { model: Servicio, as: "servicio" }
          ]
        },
        {
          model: VentaProducto,
          as: "productos",
          include: [
            {
              model: Producto,
              as: "producto",
            },
          ],
        }
      ],
    });

    // ================
    // FORMATEAR DATOS
    // ================
    const ventasFormateadas = ventas.map(v => {
  const json = v.toJSON();

  return {
    codVenta: json.codVenta,
    fecha: json.fecha,
    rutCliente: json.rutCliente,
    total: json.total,
    estadoVenta: json.estadoVenta,

    servicios: json.detalles?.map(d => ({
      codServicio: d.codServicio,
      nombreServicio: d.servicio?.nombreServicio,
      descripcionDetalle: d.descripcionDetalle,
      observaciones: d.observaciones,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
    })) || [],

    productos: json.productos?.map(p => ({
      codProducto: p.codProducto,
      nombre: p.producto?.nombreProducto || "Producto",
      cantidad: p.cantidad,
      precioUnitario: p.precioVenta ?? 0,
      subtotal: p.subtotal ?? 0,

    })) || []
  };
});


    return res.json({ data: ventasFormateadas });

  } catch (error) {
    console.error("Error al obtener ventas del cliente:", error);
    return res.status(500).json({ error: "Error interno al obtener órdenes del cliente" });
  }
};

export const agregarVenta = async (req: Request, res: Response) => {
  const t = await db.transaction();

  try {
    const { rutCliente, fecha, productos, estadoVenta } = req.body;
    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: "No hay productos en la venta" });
    }
    // Genera código de venta
    const totalVentas = await Venta.count();
    const numero = totalVentas + 1;

    const codVenta = `VENTA-${numero.toString().padStart(4, "0")}`;

    // crear la venta
    const venta = await Venta.create(
      {
        codVenta,
        rutCliente,
        fecha,
        total: 0,
        estadoVenta,
      },
      { transaction: t }
    );

    let totalFinal = 0;

    // Recorrer productos
    for (const item of productos) {
      const producto = await Producto.findByPk(item.codProducto, {
        transaction: t,
      });

      if (!producto) {
        throw new Error(`Producto ${item.codProducto} no existe`);
      }

      // Validar stock
      if (producto.stock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para ${producto.nombreProducto} (Stock actual: ${producto.stock})`
        );
      }

      const subtotal = producto.precioUnitario * item.cantidad;
      totalFinal += subtotal;

      // Registrar en venta_productos
      await VentaProducto.create(
        {
          codProducto: item.codProducto,
          codVenta: venta.codVenta,
          cantidad: item.cantidad,
          precioVenta: producto.precioUnitario,
          subtotal,
        },
        { transaction: t }
      );

      // Restar stock
      await producto.update(
        { stock: producto.stock - item.cantidad },
        { transaction: t }
      );
    }

    // -------------------------------
    // 4. Actualizar total venta
    // -------------------------------
    await venta.update({ total: totalFinal }, { transaction: t });

    // Confirmar transacción
    await t.commit();

    res.status(201).json({
      mensaje: "Venta registrada correctamente",
      venta,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error en venta:", error);
    res.status(500).json({ error: error.message });
  }
};

export const editarVenta = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    await venta.update(request.body)
    await venta.save()
    response.json({data: venta})
}

export const borrarVenta = async(request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    await venta.destroy()
    response.json({data: "Venta eliminado"})
}

export const cancelarVenta = async (req: Request, res: Response) => {
  try {
    const { codVenta, codAgenda } = req.body;

    if (!codVenta) {
      return res.status(400).json({ error: "Debe proporcionar codVenta" });
    }

    // Buscar la venta
    const venta = await Venta.findOne({ where: { codVenta } });
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    // Actualizar estado de la venta
    venta.estadoVenta = "cancelada";
    await venta.save();

    // Eliminar productos asociados y devolver stock
    const productos = await VentaProducto.findAll({ where: { codVenta } });
    for (const p of productos) {
      const producto = await Producto.findByPk(p.codProducto);
      if (producto) {
        await producto.update({ stock: producto.stock + p.cantidad });
      }
    }
    const productosEliminados = await VentaProducto.destroy({ where: { codVenta } });

    // Eliminar servicios asociados
    const serviciosEliminados = await VentaServicio.destroy({ where: { codVenta } });

    // Cancelar agenda vinculada
    let agendaCancelada = null;
    const agenda = codAgenda
      ? await Agenda.findOne({ where: { codAgenda } })
      : await Agenda.findOne({ where: { codVenta } });

    if (agenda) {
      agenda.estado = "cancelada";
      await agenda.save();
      agendaCancelada = agenda;
      console.log("Agenda cancelada:", agenda.codAgenda);
    } else {
      console.warn("⚠️ No se encontró agenda vinculada a la venta:", codVenta);
    }

    res.status(200).json({
      mensaje: "Venta cancelada correctamente",
      productosEliminados,
      serviciosEliminados,
      data: {
        venta,
        agenda: agendaCancelada
      }
    });
  } catch (error: any) {
    console.error("Error al cancelar venta:", error);
    res.status(500).json({
      error: "Error interno al cancelar venta",
      detalle: error.message
    });
  }
};
