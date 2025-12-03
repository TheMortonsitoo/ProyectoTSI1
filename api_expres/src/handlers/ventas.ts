import { Request, Response } from "express"
import Venta from "../models/Venta"
import Producto from "../models/Producto"
import VentaProducto from "../models/VentaProducto"
import db from "../config/database"

export const getVentas = async (request: Request, response: Response) => {
    const venta = await Venta.findAll()
    response.json({data:venta})
}

export const getVentaByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const venta = await Venta.findByPk(id)
    response.json({data:venta})
}

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
    const { codVenta } = req.body;
    console.log("Cancelando venta:", codVenta);

    const venta = await Venta.findOne({ where: { codVenta } });
    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    venta.estadoVenta = "cancelada";
    await venta.save();

    res.status(200).json({
      mensaje: "Venta cancelada correctamente",
      data: venta
    });
  } catch (error) {
    console.error("Error al cancelar venta:", error);
    res.status(500).json({ error: "Error interno al cancelar venta" });
  }
};

