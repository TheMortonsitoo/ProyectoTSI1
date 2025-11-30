import { Request, Response } from "express";
import Empleado from "../models/Empleado";
import bcrypt from "bcrypt";

// Obtener empleados
export const getEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll({
      where: { rol: "empleado" }
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener empleados", error });
  }
};

// Obtener empleado por RUT
export const getEmpleadoByRut = async (req: Request, res: Response) => {
  const { rut } = req.params;
  const empleado = await Empleado.findByPk(rut);
  res.json({ data: empleado });
};

export const perfilEmpleado = async (req: Request, res: Response) => {
  try {
    const rut = (req as any).user?.rut;

    const empleado = await Empleado.findOne({
      where: { rutEmpleado: rut }
    });

    if (!empleado) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    return res.json(empleado);

  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno" });
  }
};


// Crear empleado
export const agregarEmpleado = async (req: Request, res: Response) => {
  try {
    const { contrasena, ...resto } = req.body;

    if (!contrasena) {
      return res.status(400).json({ error: "La contraseña es obligatoria" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const empleado = await Empleado.create({
      ...resto,
      contrasena: hashedPassword
    });

    res.json({ data: empleado });

  } catch (error: any) {
    res.status(500).json({ error: "Error al crear empleado", detalle: error.message });
  }
};

// Editar empleado
export const editarEmpleado = async (req: Request, res: Response) => {
  const { rut } = req.params;
  const empleado = await Empleado.findByPk(rut);

  await empleado.update(req.body);
  await empleado.save();

  res.json({ data: empleado });
};

// Borrar empleado
export const borrarEmpleado = async (req: Request, res: Response) => {
  const { rut } = req.params;
  const empleado = await Empleado.findByPk(rut);

  await empleado.destroy();
  res.json({ data: "Empleado eliminado" });
};