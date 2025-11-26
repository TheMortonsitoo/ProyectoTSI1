import { Request, Response } from "express";
import Cliente from "../models/Cliente";
import Empleado from "../models/Empleado";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { mail, contrasena } = req.body;
  // buscar cliente
  const cliente = await Cliente.findOne({ where: { mail } });

  // buscar empleado
  const empleado = await Empleado.findOne({ where: { mail } });

  const usuario: any = cliente || empleado;
  const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
  
  console.log("Mail recibido:", mail);
  console.log("Contraseña recibida:", contrasena);
  console.log("Contraseña BD:", usuario.contrasena);
  console.log("Contrsena valida", esCorrecta);

  if (!usuario) {
    return res.status(400).json({ success: false, error: "Usuario no encontrado" });
  }

  if (!esCorrecta) {
    return res.status(400).json({ success: false, error: "Contraseña incorrecta" });
  }

  const rol = cliente ? "cliente" : "admin";
  const id = cliente ? usuario.rutCliente : usuario.rutEmpleado;

  // generar token
  const token = jwt.sign(
    {
      id,
      email: usuario.mail,
      rol,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "1h" }
  );

  return res.json({
    success: true,
    token,
    user: {
      id,
      email: usuario.mail,
      rol
    }
  });
};
