import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];   // opcional: si no se pasa, basta con estar logueado
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const storedRol = localStorage.getItem("rol");

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si no se especifican roles, cualquier usuario logueado puede entrar
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  // Normalizar rol y lista de roles permitidos
  const rol = storedRol?.toLowerCase();
  const allowed = allowedRoles.map(r => r.toLowerCase());

  // Validar acceso por rol
  return rol && allowed.includes(rol)
    ? children
    : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
