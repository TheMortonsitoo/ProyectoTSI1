import { useState, useEffect } from "react";

interface Producto {
  codProducto: string;
  nombreProducto: string;
  precioUnitario: number;
  descripcion?: string;
  stock?: number;
}

const ProductosList = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productos");
        const data = await response.json();
        console.log("Productos cargados:", data); // 👈 confirma que es un array
        setProductos(data.data); // 👈 usa directamente el array
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h3>Listado de productos</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(productos) &&
          productos.map((p) => (
            <li
              key={p.codProducto}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "5px",
              }}
            >
              <strong>{p.nombreProducto}</strong>
              <br />
              precio: ${p.precioUnitario}
              <br />
              <span>
                Unidades:{" "}
                {p.stock !== null && p.stock !== undefined ? p.stock : 0}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductosList;
