import { Request, Response } from "express"
import Agenda from "../models/Agenda"
import { AuthRequest } from "../middleware/auth"

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
    const { rutEmpleado, patente, fecha, hora, codServicio } = req.body;

    console.log("req.body:", req.body);
    console.log("rutCliente recibido:", rutCliente);
    console.log("rutEmpleado recibido:", rutEmpleado);

    const ultimo = await Agenda.findOne({ order: [["codAgenda", "DESC"]] });
    let nuevoCodigo = "AGEN001";
    if (ultimo?.codAgenda) {
      const numero = parseInt(ultimo.codAgenda.replace("AGEN", ""), 10);
      nuevoCodigo = `AGEN${(numero + 1).toString().padStart(3, "0")}`;
    }

    const agendamiento = await Agenda.create({
      codAgenda: nuevoCodigo,
      rutEmpleado, 
      rutCliente,
      patente,
      fecha,
      hora,
      estado: "pendiente",
      razonVisita: "Agendado"
    });

    res.json({ mensaje: "Servicio agendado con éxito", agendamiento });
  } catch (error) {
    console.error("Error al agendar:", error);
    res.status(500).json({ mensaje: "Error al agendar servicio", error });
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






