import { Request, Response } from "express"
import Agenda from "../models/Agenda"
import { AuthRequest } from "../middleware/auth"
import Venta from "../models/Venta"
import VentaServicio from "../models/VentaServicio"
import { Op } from "sequelize"

export const getCalendario = async(request: Request, response: Response) => {
    const calendario = await Agenda.findAll()
    response.json({data: calendario})
}

export const agregarFecha = async(request: Request, response: Response) => {
    console.log(request.body)
    const fecha = await Agenda.create(request.body)
    response.json({data: fecha})
}

export const editarCalendario = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarCalendario = await Agenda.findByPk(id)
    await editarCalendario.update(request.body)
    await editarCalendario.save()
    response.json({data: editarCalendario})
}


export const borrarFecha = async(request: Request, response: Response) => {
    const {rut} = request.params
    const borrarfecha = await Agenda.findByPk(rut)
    await borrarfecha.destroy()
    response.json({data: "Fecha eliminado"})
}

export const agendarServicio = async (req: AuthRequest, res: Response) => {
  try {
    const rutCliente = req.user?.rut || req.body.rutCliente || req.body.rut_cliente;
    const {
      rutEmpleado,
      patente,
      fecha,
      hora,
      codServicio,
      descripcion,
      observaciones,
      precio_unitario
    } = req.body;

    // Generar nuevo código de agenda
    const ultimoAgenda = await Agenda.findOne({ order: [["codAgenda", "DESC"]] });
    let nuevoCodigo = "AGEN001";
    if (ultimoAgenda?.codAgenda) {
      const numero = parseInt(ultimoAgenda.codAgenda.replace("AGEN", ""), 10);
      nuevoCodigo = `AGEN${(numero + 1).toString().padStart(3, "0")}`;
    }

    // Crear la agenda
    const agendamiento = await Agenda.create({
      codAgenda: nuevoCodigo,
      rutEmpleado,
      rutCliente,
      patente,
      fecha,
      hora,
      estado: "pendiente",
      razonVisita: descripcion,
      observaciones: observaciones ?? ""  // 👈 AGREGADO AQUÍ
    });


    // Generar código de venta secuencial
    const ultimaVenta = await Venta.findOne({
      where: { codVenta: { [Op.like]: "VENTA-%" } },
      order: [["codVenta", "DESC"]],
      attributes: ["codVenta"]
    });

    let codVenta = "VENTA-0001";
    if (ultimaVenta?.codVenta) {
      const match = ultimaVenta.codVenta.match(/^VENTA-(\d+)$/);
      const numero = match ? parseInt(match[1], 10) : 0;
      codVenta = `VENTA-${(numero + 1).toString().padStart(4, "0")}`;
    }

    // Crear la venta
    const venta = await Venta.create({
      codVenta,
      rutCliente,
      fecha,
      total: precio_unitario,
      estadoVenta: "finalizada"
    });

    console.log("Insertando en venta_servicios:", {
      codVenta,
      codServicio,
      descripcionDetalle: descripcion,
      observaciones,
      precioUnitario: precio_unitario,
      subtotal: precio_unitario
    });

    // Registrar el servicio vendido
    await VentaServicio.create({
      codVenta,
      codServicio,
      descripcionDetalle: descripcion ?? "",
      observaciones: observaciones ?? "",
      precioUnitario: precio_unitario ?? 0,
      subtotal: precio_unitario ?? 0
    });

    res.json({
      mensaje: "Servicio agendado y venta registrada con éxito",
      agendamiento,
      venta
    });
  } catch (error) {
    console.error("Error al agendar y registrar venta:", error);
    res.status(500).json({ mensaje: "Error al agendar y registrar venta", error });
  }
};
//para obtener las horas tomadas.
export const obtenerOcupados = async (req: Request, res: Response) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ mensaje: "La fecha es obligatoria" });
    }

    const ocupados = await Agenda.findAll({
      where: { fecha },
      attributes: ["hora", "rutEmpleado"], 
    });

    return res.json(ocupados);
  } catch (error) {
    console.error("Error al obtener horas ocupadas:", error);
    res.status(500).json({ mensaje: "Error al obtener horas ocupadas" });
  }
};






