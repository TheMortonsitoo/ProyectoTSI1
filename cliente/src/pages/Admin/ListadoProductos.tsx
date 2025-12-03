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
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  const [formEdit, setFormEdit] = useState({
    nombreProducto: "",
    precioUnitario: "",
    descripcion: "",
    stock:"",
  });
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


  const abrirEditor = (producto: Producto) => {
    setProductoEditando(producto);
    setFormEdit({
      nombreProducto: producto.nombreProducto,
      precioUnitario: String(producto.precioUnitario),
      descripcion: producto.descripcion ?? "",
      stock: producto.stock ? String(producto.stock) : "0",
    });
  };
  const borrarProducto = async (codProducto: string, nombreProducto: string) => {
    if (!window.confirm(`¿Desea eliminar el producto ${nombreProducto}?`)) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/productos/${codProducto}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar");
      alert("Producto eliminado con éxito");
      fetchProductos(); // Recarga
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar el producto");
    }
  };

  const guardarCambios = async () => {
  if (!productoEditando) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/productos/${productoEditando.codProducto}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreProducto: formEdit.nombreProducto,
          precioUnitario: Number(formEdit.precioUnitario),
          descripcion: formEdit.descripcion,
          stock: Number(formEdit.stock),
        }),
      }
    );

    if (!response.ok) throw new Error("Error al actualizar");

    alert("Producto actualizado con éxito");

    setProductoEditando(null); // Cierra modal
    fetchProductos(); // Recarga
  } catch (error) {
    console.error(error);
    alert("❌ No se pudo actualizar el producto");
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
                
                <button
                  onClick={() => abrirEditor(p)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#1d8c0fff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "8px"
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => borrarProducto(p.codProducto, p.nombreProducto)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ff0000ff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "8px"
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {productoEditando && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "350px",
            }}
          >
            <h4>Editar producto</h4>

            <input
              className="form-control mb-2"
              placeholder="Nombre"
              value={formEdit.nombreProducto}
              onChange={(e) =>
                setFormEdit({ ...formEdit, nombreProducto: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Precio"
              type="number"
              value={formEdit.precioUnitario}
              onChange={(e) =>
                setFormEdit({ ...formEdit, precioUnitario: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Descripción"
              value={formEdit.descripcion}
              onChange={(e) =>
                setFormEdit({ ...formEdit, descripcion: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="stock  "
              value={formEdit.stock}
              onChange={(e) =>
                setFormEdit({ ...formEdit, stock: e.target.value })
              }
            />

            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginRight: "6px",
              }}
              onClick={guardarCambios}
            >
              Guardar
            </button>

            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "gray",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={() => setProductoEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosList;
