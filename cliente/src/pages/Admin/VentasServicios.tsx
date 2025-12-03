import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api";

interface Cliente {
  rutCliente: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mail: string;
  fono: string;
  direccion: string;
}

interface Servicio {
  codServicio: string;
  nombreServicio: string;
  descripcion: string;
  precio: number;
  tiempo: string;
}

interface Venta {
  codVenta: string;
  fecha: string;
  total: number;
  estadoVenta: string;
  cliente: Cliente;
}

interface VentaServicio {
  id: number;
  descripcionDetalle: string;
  observaciones: string;
  observacionesEmpleado: string;
  precioUnitario: number;
  subtotal: number;
  servicio: Servicio;
  venta: Venta;
}

const VentasServicios = () => {
  const [ventas, setVentas] = useState<VentaServicio[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarVentas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API}/ventasServicios`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVentas(response.data.data);
    } catch (error) {
      console.error("Error cargando ventas de servicios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  if (loading) return <p>Cargando ventas...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ventas de Servicios</h2>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Venta Nº</th>
            <th>Cliente</th>
            <th>RUT</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Detalle</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Total Venta</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((v) => (
            <tr key={v.id}>
              <td>{v.venta.codVenta}</td>
              <td>
                {v.venta.cliente.nombre} {v.venta.cliente.apellidoPaterno}
              </td>
              <td>{v.venta.cliente.rutCliente}</td>
              <td>{v.venta.fecha}</td>
              <td>{v.servicio?.nombreServicio}</td>
              <td>{v.descripcionDetalle}</td>
              <td>${v.precioUnitario}</td>
              <td>${v.subtotal}</td>
              <td>${v.venta.total}</td>
              <td>{v.venta.estadoVenta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasServicios;
