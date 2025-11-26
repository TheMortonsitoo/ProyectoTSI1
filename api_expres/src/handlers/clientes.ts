import { Request, Response } from "express"
import Cliente from "../models/Cliente"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";
import Empleado from "../models/Empleado";

export const getClientes = async (request: Request, response: Response) => {
    const clientes = await Cliente.findAll()
    response.json({data:clientes})
}

export const getClienteByRut = async (request: Request, response: Response) => {
    const {rut} = request.params
    const cliente = await Cliente.findByPk(rut)
    response.json({data:cliente})
}

export const agregarCliente = async (req: Request, res: Response) => {
  try {
    console.log("Body recibido:", req.body);
    const existeMail = await Cliente.findOne({ where: { mail: req.body.mail } });
    if (existeMail) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

    const cliente = await Cliente.create({
      rutCliente: req.body.rutCliente,
      nombre: req.body.nombre,
      apellidoPaterno: req.body.apellidoPaterno,
      apellidoMaterno: req.body.apellidoMaterno,
      direccion: req.body.direccion,
      fono: req.body.fono,
      mail: req.body.mail,
      rol: "cliente",
      contrasena: hashedPassword
    });

    res.json(cliente);
  } catch (error: any) {
    console.error("Error en Sequelize:", error);
    res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message || error
    });
  }
};

export const editarCliente = async(request: Request, response: Response) => {
    const {rut} = request.params
    const editarCliente = await Cliente.findByPk(rut)
    await editarCliente.update(request.body)
    await editarCliente.save()
    response.json({data: editarCliente})
}

export const borrarCliente = async(request: Request, response: Response) => {
    const {rut} = request.params
    const borrarCliente = await Cliente.findByPk(rut)
    await borrarCliente.destroy()
    response.json({data: "Cliente eliminado"})
}

export const perfilCliente = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    const rut = req.user.rut; // el rut lo pusiste en el token al hacer login
    const cliente = await Cliente.findByPk(rut, {
      attributes: [
        "rutCliente",
        "nombre",
        "apellidoPaterno",
        "apellidoMaterno",
        "direccion",
        "fono",
        "mail",
        "rol"
      ],
    });

    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};