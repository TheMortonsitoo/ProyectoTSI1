import { Request, Response } from "express"
import Servicio from "../models/Servicio"

export const getServicios = async (req: Request, res: Response) => {
  try {
    const servicios = await Servicio.findAll();
    res.json({ data: servicios }); // importante: envolver en { data: ... }
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ error: "No se pudo obtener la lista de servicios" });
  }
};

export const getServicioByID = async (request: Request, response: Response) => {
    const {id} = request.params
    const servicio = await Servicio.findByPk(id)
    response.json({data:servicio})
}

export const agregarServicio = async (req: Request, res: Response) => {
  try {
    const { nombreServicio, precio, descripcion, tiempo } = req.body; // 👈 usa tiempo

    const precioNumber = Number(precio);
    if (Number.isNaN(precioNumber)) {
      return res.status(400).json({ error: "Precio inválido" });
    }
    const existeServicio = await Servicio.findOne({
      where: { nombreServicio }
    });

    if (existeServicio) {
      return res.status(400).json({
        success: false,
        error: "El servicio ya está registrado"
      });
    }

    const ultimo = await Servicio.findOne({ order: [["codServicio", "DESC"]] });
    let nuevoCodigo = "SERV001";

  if (ultimo?.codServicio) {
    const numero = Number(ultimo.codServicio.replace("SERV", ""));

    // Si NO es un número válido, reinicia a 1
    const siguiente = isNaN(numero) ? 1 : numero + 1;

    nuevoCodigo = `SERV${siguiente.toString().padStart(3, "0")}`;
  }
  let tiempoFormateado = tiempo.toString().trim();

  // Si el usuario sólo escribió el número → agregar "minutos"
  if (!tiempoFormateado.toLowerCase().includes("min")) {
    tiempoFormateado += " minutos";
  }


    const servicio = await Servicio.create({
      codServicio: nuevoCodigo,
      nombreServicio,
      precio: precioNumber,
      descripcion,
      tiempo: tiempoFormateado
    });

    res.status(201).json({ data: servicio });
  } catch (error) {
    console.error("Error al agregar servicio:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        error: "El servicio ya está registrado"
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error interno al agregar el servicio",
      detalle: error.message
    });
  }
};

export const editarServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const editarServicio = await Servicio.findByPk(id)
    await editarServicio.update(request.body)
    await editarServicio.save()
    response.json({data: editarServicio})
}

export const borrarServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const borrarServicio = await Servicio.findByPk(id)
    await borrarServicio.destroy()
    response.json({data: "Servicio eliminado"})
}