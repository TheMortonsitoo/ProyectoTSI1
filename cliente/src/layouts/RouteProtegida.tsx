import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  // Leer directamente desde localStorage en cada render
  const storedRol = localStorage.getItem("rol");
  console.log("Rol leído en ProtectedRoute:", storedRol);

  // Si no hay rol guardado, redirigir
  if (!storedRol) {
    return <Navigate to="/unauthorized" />;
  }

  // Normalizar a minúsculas para comparar
  const rol = storedRol.toLowerCase();
  const allowed = allowedRoles.map(r => r.toLowerCase());

  // Validar acceso
  return allowed.includes(rol) ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
