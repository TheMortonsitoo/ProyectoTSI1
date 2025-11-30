import { Request, Response } from "express"
import Servicio from "../models/Servicio"

export const getServicios = async (request: Request, response: Response) => {
    try {
    const servicios = await Servicio.findAll({
      attributes: ["codServicio", "nombreServicio", "precio", "tiempo"]
    });
    response.json(servicios);
  } catch (error) {
    response.status(500).json({ mensaje: "Error al obtener servicios", error });
  }
}

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

    const ultimo = await Servicio.findOne({ order: [["codServicio", "DESC"]] });
    let nuevoCodigo = "SERV001";
    if (ultimo?.codServicio) {
      const numero = parseInt(ultimo.codServicio.replace("SERV", ""), 10);
      nuevoCodigo = `SERV${(numero + 1).toString().padStart(3, "0")}`;
    }

    const servicio = await Servicio.create({
      codServicio: nuevoCodigo,
      nombreServicio,
      precio: precioNumber,
      descripcion,
      tiempo, // 👈 ahora coincide con el modelo
    });

    res.status(201).json({ data: servicio });
  } catch (error) {
    console.error("Error al agregar servicio:", error);
    res.status(500).json({ error: "No se pudo agregar el servicio" });
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