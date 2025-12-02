import { Request, Response } from "express"
import Servicio from "../models/Servicio"

const convertirATiempoEnMinutos = (valor: any): number => {
  if (!valor) return 0;

  const text = valor.toString().toLowerCase().trim();

  // Solo número → minutos
  if (/^\d+$/.test(text)) return Number(text);

  // horas → minutos ("2 horas", "1.5h")
  if (text.includes("hora")) {
    const numero = parseFloat(text);
    return Math.round(numero * 60);
  }

  if (text.includes("h")) {
    const numero = parseFloat(text.replace("h", ""));
    return Math.round(numero * 60);
  }

  // minutos explícitos
  if (text.includes("min")) {
    return parseInt(text);
  }

  return 0;
};


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
  const tiempoEnMinutos = convertirATiempoEnMinutos(tiempo);

  const servicio = await Servicio.create({
    codServicio: nuevoCodigo,
    nombreServicio,
    precio: precioNumber,
    descripcion,
    tiempo: tiempoEnMinutos
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

export const editarServicio = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const servicio = await Servicio.findByPk(id);

    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    const { nombreServicio, precio, descripcion, tiempo } = req.body;

    const tiempoEnMinutos = convertirATiempoEnMinutos(tiempo);

    await servicio.update({
      nombreServicio,
      precio,
      descripcion,
      tiempo: tiempoEnMinutos
    });

    res.json({ data: servicio });

  } catch (error) {
    console.error("Error al editar servicio:", error);
    res.status(500).json({ error: "Error interno al editar servicio" });
  }
};


export const borrarServicio = async(request: Request, response: Response) => {
    const {id} = request.params
    const borrarServicio = await Servicio.findByPk(id)
    await borrarServicio.destroy()
    response.json({data: "Servicio eliminado"})
}