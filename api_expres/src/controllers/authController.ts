// handlers/auth.ts
import { Request, Response } from "express";
import Cliente from "../models/Cliente";
import Empleado from "../models/Empleado";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { mail, contrasena } = req.body;

  try {
    // Buscar cliente o empleado por mail
    const cliente = await Cliente.findOne({ where: { mail } });
    const empleado = await Empleado.findOne({ where: { mail } });
    const usuario: any = cliente || empleado;

    if (!usuario) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado" });
    }

    // Validar contraseña
    const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esCorrecta) {
      return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
    }

    // Determinar rol y rut
    let rol = "";
    let rut = "";

    if (cliente) {
      rol = "cliente";
      rut = usuario.rutCliente;
    } else if (empleado) {
      rol = usuario.rol;  
      rut = usuario.rutEmpleado;
    }

    // Generar token con rut y rol
    const token = jwt.sign(
      { rut, rol, email: usuario.mail },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );

    // Respuesta JSON
    return res.json({
      success: true,
      token,
      user: {
        rut,               
        email: usuario.mail,
        rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
