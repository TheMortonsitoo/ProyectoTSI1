import { Request, Response } from "express"
import Cliente from "../models/Cliente";
import Empleado from "../models/Empleado";

export const sincronizarAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Cliente.findAll({ where: { rol: "Admin" } });

    let agregados = 0;
    for (const admin of admins) {
      const existe = await Empleado.findOne({ where: { mail: admin.mail } }); // 🔑 cambio aquí
      if (!existe) {
        await Empleado.create({
          rutEmpleado: admin.rutCliente,
          nombres: admin.nombre,
          apellidoPaterno: admin.apellidoPaterno,
          apellidoMaterno: admin.apellidoMaterno,
          telefono: admin.fono,
          mail: admin.mail,
          rol: "Admin",
          contrasena: admin.contrasena
        });
        agregados++;
        console.log(`Admin ${admin.mail} sincronizado en empleados`);
      }
    }

    res.json({ mensaje: `Admins sincronizados correctamente. ${agregados} agregado(s).` });
  } catch (error) {
    console.error("Error al sincronizar admins:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
