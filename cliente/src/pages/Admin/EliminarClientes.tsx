import { useEffect, useState } from "react";

interface Cliente {
  rutCliente: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mail: string;
  fono?: string;
  direccion?: string;
}

const ClientesList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const rol = localStorage.getItem("rol");
  const token = localStorage.getItem("token");

  const fetchClientes = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/clientes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

      const data = await response.json();
      setClientes(data.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

 const borrarCliente = async (rut: string, nombre: string) => {
  if (!window.confirm(`¿Desea eliminar al cliente ${nombre}?`)) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/clientes/${rut}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json(); // ← leer respuesta

    if (!response.ok) {
      alert(`❌ ${data.message || "No se pudo eliminar el cliente"}`);
      return;
    }

    alert("Cliente eliminado con éxito");
    fetchClientes();
  } catch (error) {
    console.error(error);
    alert("❌ Error al intentar eliminar el cliente.");
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
      <h3>Listado de clientes</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {clientes.map((c) => (
          <li
            key={c.rutCliente}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
            }}
          >
            <strong>
              {c.nombre} {c.apellidoPaterno}
            </strong>
            <br />
            <span>RUT: {c.rutCliente}</span>
            <br />
            <span>Correo: {c.mail}</span>

            {rol === "admin" && (
              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={() => borrarCliente(c.rutCliente, c.nombre)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ff0000ff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "8px",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
