import { Request, Response } from "express"
import Agenda from "../models/Agenda"
import { AuthRequest } from "../middleware/auth"
import Venta from "../models/Venta"
import VentaServicio from "../models/VentaServicio"
import { Op, QueryTypes } from "sequelize"
import db from "../config/database"

export const getCalendario = async(request: Request, response: Response) => {
    const calendario = await Agenda.findAll()
    response.json({data: calendario})
}

export const getAgendaByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const agenda = await Agenda.findByPk(id);
  if (!agenda) return res.status(404).json({ error: "Agenda no encontrada" });
  res.json({ data: agenda });
};


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
      observaciones_cliente,
      precio_unitario
    } = req.body;

    // Generar nuevo código de agenda
    const ultimoAgenda = await Agenda.findOne({ order: [["codAgenda", "DESC"]] });
    let nuevoCodigo = "AGEN001";
    if (ultimoAgenda?.codAgenda) {
      const numero = parseInt(ultimoAgenda.codAgenda.replace("AGEN", ""), 10);
      nuevoCodigo = `AGEN${(numero + 1).toString().padStart(3, "0")}`;
    }

    // Crear la agenda (sin codVenta aún)
    const agendamiento = await Agenda.create({
      codAgenda: nuevoCodigo,
      rutEmpleado,
      rutCliente,
      patente,
      fecha,
      hora,
      estado: "pendiente",
      razonVisita: descripcion,
      observaciones_cliente: observaciones_cliente ?? ""
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
      estadoVenta: "Pendiente"
    });

    // Registrar el servicio vendido
    await VentaServicio.create({
      codVenta,
      codServicio,
      descripcionDetalle: descripcion ?? "",
      observaciones: observaciones_cliente ?? "",
      precioUnitario: precio_unitario ?? 0,
      subtotal: precio_unitario ?? 0
    });

    // 🔗 Vincular agenda con la venta
    agendamiento.codVenta = venta.codVenta;
    await agendamiento.save();

    // ✅ Respuesta clara para frontend
    res.status(201).json({
      mensaje: "Servicio agendado y venta registrada con éxito",
      data: {
        codAgenda: agendamiento.codAgenda,
        codVenta: venta.codVenta,
        agenda: agendamiento,
        venta
      }
    });
  } catch (error) {
    console.error("Error al agendar y registrar venta:", error);
    res.status(500).json({ mensaje: "Error al agendar y registrar venta", error });
  }
};



//para obtener las horas tomadas.
export const getOcupados = async (req: Request, res: Response) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res.status(400).json({ error: "Debe proporcionar una fecha" });
    }

    // Buscar todas las agendas de esa fecha
    const agendas = await Agenda.findAll({
      where: {
        fecha,
        estado: { [Op.in]: ["pendiente", "finalizada"] } 
      },
      attributes: ["hora", "rutEmpleado", "estado"]
    });

    // Devolver ocupados con los nombres correctos
    const ocupados = agendas.map(a => ({
      hora: a.hora,
      rutEmpleado: a.rutEmpleado,
      estado: a.estado
    }));

    res.json({ data: ocupados });
  } catch (error) {
    console.error("Error al obtener ocupados:", error);
    res.status(500).json({ error: "Error interno al obtener ocupados" });
  }
};
export const getAgendasEmpleado = async (req, res) => {
  const { rutEmpleado } = req.params;

  const agendas = await Agenda.findAll({
    where: { rutEmpleado },
  });

  res.json({ data: agendas });
};
export const agregarObservacionEmpleado = async (req: Request, res: Response) => {
  try {
    const { codAgenda } = req.params;
    const { observaciones_empleado } = req.body;

    const agenda = await Agenda.findOne({ where: { codAgenda } });
    if (!agenda) return res.status(404).json({ mensaje: "Agenda no encontrada" });

    agenda.observaciones_empleado = observaciones_empleado;
    await agenda.save();

    res.json({ mensaje: "Observación guardada", data: agenda });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al guardar observación" });
  }
};

export const cambiarEstadoAgenda = async (req: Request, res: Response) => {
  try {
    const { codAgenda } = req.params;
    const { estado } = req.body;

    const agenda = await Agenda.findOne({ where: { codAgenda } });
    if (!agenda) {
      return res.status(404).json({ mensaje: "Agenda no encontrada" });
    }

    agenda.estado = estado;
    await agenda.save();

    res.json({ mensaje: "Estado actualizado correctamente", data: agenda });
  } catch (error) {
    console.error("ERROR CAMBIAR ESTADO:", error);
    res.status(500).json({ mensaje: "Error al cambiar estado" });
  }
};

export const getEstadoAgendaPorVenta = async (req: Request, res: Response) => {
  const { codVenta } = req.params;

  try {
    // Buscamos la agenda que tenga asociada esa venta
    const agenda = await Agenda.findOne({ where: { codVenta } });

    if (!agenda) {
      return res.status(404).json({
        ok: false,
        msg: "No existe agenda asociada a esta venta",
      });
    }

    // OJO: aquí usamos el nombre REAL de la columna en la tabla agenda
    // si tu campo se llama distinto (ej: estadoAgenda), cámbialo acá:
    return res.json({
      ok: true,
      estado: agenda.estado,
    });
  } catch (error) {
    console.error("ERROR getEstadoAgendaPorVenta:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error obteniendo estado del servicio",
    });
  }
};



export const cancelarAgenda = async (req: Request, res: Response) => {
  try {
    const { codAgenda } = req.body;

    // Buscar la agenda
    const agenda = await Agenda.findOne({ where: { codAgenda } });
    if (!agenda) {
      return res.status(404).json({ error: "Agenda no encontrada" });
    }

    // Actualizar estado
    agenda.estado = "cancelada";
    await agenda.save();

    res.status(200).json({
      mensaje: "Agenda cancelada correctamente",
      data: agenda
    });
  } catch (error) {
    console.error("Error al cancelar agenda:", error);
    res.status(500).json({ error: "Error interno al cancelar agenda" });
  }
}

