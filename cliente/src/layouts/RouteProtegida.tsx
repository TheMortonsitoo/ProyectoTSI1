import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    console.log("Rol leído en ProtectedRoute: ", storedRol);
    setRol(storedRol ? storedRol.toLowerCase() : null);
  }, []);

  if (rol === null) {
    return <div>Verificando acceso...</div>; // loader temporal
  }

  const allowed = allowedRoles.map(r => r.toLowerCase());
  return allowed.includes(rol) ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
