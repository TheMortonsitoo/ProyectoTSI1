import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const autenticar = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ mensaje: "No se envió token" });
  }

  // Aseguramos que el header tenga el formato "Bearer <token>"
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ mensaje: "Token mal formado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded; // guardamos los datos del payload (rut, mail, rol)
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

export const verificarRol = (rolesPermitidos: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // Normalizamos el rol para evitar problemas de mayúsculas/minúsculas o espacios
    const rol = req.user?.rol ? String(req.user.rol).toLowerCase().trim() : null;
    console.log("Rol recibido:", rol, "Roles permitidos:", rolesPermitidos);

    if (!rol || !rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: `Acceso denegado: rol ${rol ?? "desconocido"} no autorizado` });
    }
    next();
  };
};
