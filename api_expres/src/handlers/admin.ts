import Empleado from "../models/Empleado";
import { Request, Response } from "express";


export const perfilAdmin = async (req: Request, res: Response) => {
  try {
    const rut = (req as any).user?.rut;

    const admin = await Empleado.findOne({
      where: { rutEmpleado: rut, rol: "admin" }
    });

    if (!admin) {
      return res.status(404).json({ mensaje: "Administrador no encontrado" });
    }

    return res.json(admin);

  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno" });
  }
};
