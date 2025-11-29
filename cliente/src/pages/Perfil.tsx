import { useEffect, useState } from "react";
import axios from "axios";

interface Cliente {
  rutCliente: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  fono: string;
  mail: string;
  rol: string;
}

interface Empleado {
  rutEmpleado: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mail: string;
  rol: string;
}

interface Admin {
  rutEmpleado: string;
  nombres: string;
  mail: string;
  rol: string;
}

const Perfil = () => {
  const [data, setData] = useState<any>(null);
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const rolStored = localStorage.getItem("rol")?.toLowerCase();
        setRol(rolStored ?? null);

        if (!token || !rolStored) return;

        let endpoint = "";

        if (rolStored === "cliente") endpoint = "http://localhost:3000/api/clientes/perfil";
        if (rolStored === "empleado") endpoint = "http://localhost:3000/api/empleados/perfil";
        if (rolStored === "admin") endpoint = "http://localhost:3000/api/admin/perfil";

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    fetchPerfil();
  }, []);

  if (!data) return <p>Ha expirado el token de autenticación. Inicia sesión nuevamente...</p>;

  // ===========================
  //     VISTA PARA CLIENTES
  // ===========================
  if (rol === "cliente") {
    const c = data as Cliente;
    return (
      <div className="container mt-5">
        <h2>Mi Perfil (Cliente)</h2>
        <ul className="list-group">
          <li className="list-group-item"><strong>RUT:</strong> {c.rutCliente}</li>
          <li className="list-group-item"><strong>Nombre:</strong> {c.nombre} {c.apellidoPaterno} {c.apellidoMaterno}</li>
          <li className="list-group-item"><strong>Dirección:</strong> {c.direccion}</li>
          <li className="list-group-item"><strong>Teléfono:</strong> {c.fono}</li>
          <li className="list-group-item"><strong>Email:</strong> {c.mail}</li>
          <li className="list-group-item"><strong>Rol:</strong> {c.rol}</li>
        </ul>
      </div>
    );
  }

  // ===========================
  //     VISTA PARA EMPLEADOS
  // ===========================
  if (rol === "empleado") {
    const e = data as Empleado;
    return (
      <div className="container mt-5">
        <h2>Mi Perfil (Empleado)</h2>
        <ul className="list-group">
          <li className="list-group-item"><strong>RUT:</strong> {e.rutEmpleado}</li>
          <li className="list-group-item"><strong>Nombre:</strong> {e.nombres} {e.apellidoPaterno} {e.apellidoMaterno}</li>
          <li className="list-group-item"><strong>Email:</strong> {e.mail}</li>
          <li className="list-group-item"><strong>Rol:</strong> {e.rol}</li>
        </ul>
      </div>
    );
  }

  // ===========================
  //          VISTA ADMIN
  // ===========================
  if (rol === "admin") {
    const a = data as Admin;
    return (
      <div className="container mt-5">
        <h2>Mi Perfil (Administrador)</h2>
        <ul className="list-group">
          <li className="list-group-item"><strong>RUT:</strong> {a.rutEmpleado}</li>
          <li className="list-group-item"><strong>Nombre:</strong> {a.nombres} </li>
          <li className="list-group-item"><strong>Email:</strong> {a.mail}</li>
          <li className="list-group-item"><strong>Rol:</strong> {a.rol}</li>
        </ul>
         <a href="/admin" className="btn btn-primary mt-3">
        Ir al Panel de Administración
      </a>
      </div>
    );
  }

  return <p>Rol no reconocido.</p>;
};

export default Perfil;
