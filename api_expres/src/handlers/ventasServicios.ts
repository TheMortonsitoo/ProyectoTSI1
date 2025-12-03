import { Request, Response } from "express";
import VentaServicio from "../models/VentaServicio";

// Obtener todos los servicios de venta
export const getVentasServicios = async (req: Request, res: Response) => {
  try {
    const servicios = await VentaServicio.findAll();
    res.json({ data: servicios });
  } catch (error) {
    console.error("Error al obtener ventas de servicios:", error);
    res.status(500).json({ error: "Error interno al obtener ventas de servicios" });
  }
};

// Obtener un servicio de venta por ID
export const getVentaServicioByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicio = await VentaServicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Venta de servicio no encontrada" });
    res.json({ data: servicio });
  } catch (error) {
    console.error("Error al obtener venta de servicio:", error);
    res.status(500).json({ error: "Error interno al obtener venta de servicio" });
  }
};

// Agregar un servicio a la venta
export const agregarVentaServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await VentaServicio.create(req.body);
    res.status(201).json({ mensaje: "Venta de servicio registrada", data: servicio });
  } catch (error) {
    console.error("Error al agregar venta de servicio:", error);
    res.status(500).json({ error: "Error interno al agregar venta de servicio" });
  }
};

// Editar un servicio de venta
export const editarVentaServicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicio = await VentaServicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Venta de servicio no encontrada" });

    await servicio.update(req.body);
    res.json({ mensaje: "Venta de servicio actualizada", data: servicio });
  } catch (error) {
    console.error("Error al editar venta de servicio:", error);
    res.status(500).json({ error: "Error interno al editar venta de servicio" });
  }
};

// Borrar un servicio de venta
export const borrarVentaServicio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicio = await VentaServicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Venta de servicio no encontrada" });

    await servicio.destroy();
    res.json({ mensaje: "Venta de servicio eliminada", data: servicio });
  } catch (error) {
    console.error("Error al borrar venta de servicio:", error);
    res.status(500).json({ error: "Error interno al borrar venta de servicio" });
  }
};
