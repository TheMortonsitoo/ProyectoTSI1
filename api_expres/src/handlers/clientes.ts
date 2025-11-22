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

    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

    const cliente = await Cliente.create({
      rutCliente: req.body.rutCliente,
      nombre: req.body.nombre,
      apellidoPaterno: req.body.apellidoPaterno,
      apellidoMaterno: req.body.apellidoMaterno,
      direccion: req.body.direccion,
      fono: req.body.fono,
      mail: req.body.mail,
      rol: req.body.rol,
      contrasena: hashedPassword
    });

    if (req.body.rol === "Admin") {
      const existe = await Empleado.findByPk(req.body.rutCliente);
      if (!existe) {
        await Empleado.create({
          rutEmpleado: req.body.rutCliente,
          nombres: req.body.nombre,
          apellidoPaterno: req.body.apellidoPaterno,
          apellidoMaterno: req.body.apellidoMaterno,
          telefono: req.body.fono,
          mail: req.body.mail,
          rol: "admin",
          contrasena: hashedPassword
        });
        console.log("Admin también registrado en empleados");
      }
    }

    res.json(cliente);
  } catch (error: any) {
    console.error("Error en Sequelize:", error);
    res.status(500).json({
      mensaje: "Error en el servidor",
      error: error.message || error
    });
  }
};


export const login = async(request:Request, response:Response) => {
   const { mail, contrasena } = request.body
   const SECRET = process.env.SECRET_KEY
   try {
       const usuario = await Cliente.findOne({where:{mail}})
       if (!usuario ) {
            response.status(401).json({ message: 'Usuario no encontrado' });
            return console.error('Usuario no encontrado:', mail);
       }
        console.log("Contraseña enviada:", contrasena);
        console.log("Contraseña en BD:", usuario.contrasena);
        const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);
        console.log("¿Contraseña válida?", passwordValido);
        if (!passwordValido) {
            response.status(401).json({ message: 'Contraseña incorrecta' });
            return
        }
        
       const token = jwt.sign({ mail: usuario.mail, rut: usuario.rutCliente, rol: usuario.rol }, SECRET, { expiresIn: '1h' });
       response.json({ message: "Inicio de sesión exitoso", 
        token, 
        usuario: {
          rutCliente: usuario.rutCliente,
          nombre: usuario.nombre,
          mail: usuario.mail,
          rol: usuario.rol
        } 
    });
   }catch (error) {
       console.error('Error al iniciar sesión:', error);
       response.status(500).json({ error: 'Error interno del servidor' });
   }
}

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