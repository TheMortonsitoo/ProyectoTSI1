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

const Perfil = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3000/api/cliente/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCliente(response.data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    fetchPerfil();
  }, []);

  if (!cliente) return <p>Los Datos no se lograron cargar, Intente nuevamente...</p>;

  return (
    <div className="container mt-5">
      <h2>Mi Perfil</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>RUT:</strong> {cliente.rutCliente}</li>
        <li className="list-group-item"><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}</li>
        <li className="list-group-item"><strong>Dirección:</strong> {cliente.direccion}</li>
        <li className="list-group-item"><strong>Teléfono:</strong> {cliente.fono}</li>
        <li className="list-group-item"><strong>Email:</strong> {cliente.mail}</li>
        <li className="list-group-item"><strong>Rol:</strong> {cliente.rol}</li>
      </ul>
    </div>
  );
};

export default Perfil;