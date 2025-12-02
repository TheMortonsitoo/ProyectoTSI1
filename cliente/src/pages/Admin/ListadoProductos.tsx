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
  const [cantidad, setCantidad] = useState<{ [key: string]: number }>({});
  const rol = localStorage.getItem("rol"); // 👈 aquí guardas el rol del usuario
  const token = localStorage.getItem("token");

  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/productos");
      const data = await response.json();
      setProductos(data.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleAgregarStock = async (codProducto: string) => {
    const cantidadAgregar = cantidad[codProducto];
    if (!cantidadAgregar || cantidadAgregar <= 0) {
      alert("⚠️ Ingresa una cantidad válida.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/productos/aumentar-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ codProducto, cantidad: cantidadAgregar })
      });

      alert(" Stock actualizado");
      setCantidad((prev) => ({ ...prev, [codProducto]: 0 }));
      fetchProductos();
    } catch (error) {
      console.error("Error al aumentar stock:", error);
      alert(" No se pudo actualizar el stock.");
    }
  };

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
        {productos.map((p) => (
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
              Unidades: {p.stock !== null && p.stock !== undefined ? p.stock : 0}
            </span>

            {/* Solo visible si el usuario es admin */}
            {rol === "admin" && (
              <div style={{ marginTop: "8px" }}>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidad[p.codProducto] || ""}
                  onChange={(e) =>
                    setCantidad((prev) => ({
                      ...prev,
                      [p.codProducto]: parseInt(e.target.value, 10)
                    }))
                  }
                  style={{ width: "90px", marginRight: "8px", padding: "4px", fontSize: "14px" }}
                />
                <button
                  onClick={() => handleAgregarStock(p.codProducto)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px"
                  }}
                >
                  + Agregar Stock
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;
