import { Request, Response } from "express"
import Cliente from "../models/Cliente"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";
import Empleado from "../models/Empleado";
import Agenda from "../models/Agenda";

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
    const existeRut = await Cliente.findOne({ where: { rutCliente: req.body.rutCliente } });
    if (existeRut) {
      return res.status(400).json({ success: false, error: "El RUT ya está registrado" });
    }
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

export const borrarCliente = async (req: Request, res: Response) => {
  try {
    const { rut } = req.params;

    // 1. Buscar cliente
    const cliente = await Cliente.findByPk(rut);
    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente no encontrado" });
    }

    // 2. Validar si el cliente tiene agendas
    const agendaAsociada = await Agenda.findOne({
      where: { rutCliente: rut }
    });

    if (agendaAsociada) {
      return res.status(400).json({
        success: false,
        message: "No se puede eliminar el cliente porque tiene agendas asociadas."
      });
    }

    // 3. Eliminar cliente si no tiene agendas
    await cliente.destroy();

    return res.json({
      success: true,
      message: "Cliente eliminado correctamente"
    });

  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
};

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