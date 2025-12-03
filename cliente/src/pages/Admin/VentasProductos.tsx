import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api";

const VentasProductos = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarVentas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API}/ventasProductos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVentas(response.data.data);
    } catch (error) {
      console.error("Error cargando ventas de productos", error);
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
      <h2 className="mb-4">Ventas de Productos</h2>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Venta Nº</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Total Venta</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((v: any) => (
            <tr key={`${v.codVenta}-${v.codProducto}`}>
              <td>{v.venta?.codVenta}</td>

              {/* CLIENTE */}
              <td>
                {v.venta?.cliente?.nombre} {v.venta?.cliente?.apellidoPaterno}
              </td>

              {/* PRODUCTO */}
              <td>{v.producto?.nombreProducto}</td>

              {/* CANTIDAD */}
              <td>{v.cantidad}</td>

              {/* PRECIO UNITARIO */}
              <td>${v.precioVenta}</td>

              {/* SUBTOTAL */}
              <td>${v.subtotal}</td>

              {/* TOTAL DE LA VENTA (de tabla ventas) */}
              <td>${v.venta?.total}</td>

              {/* ESTADO DE LA VENTA */}
              <td>{v.venta?.estadoVenta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasProductos;
