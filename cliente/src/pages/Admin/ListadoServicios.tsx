import { useState, useEffect } from "react";

interface Servicio {
  codServicio: string;
  nombreServicio: string;
  precio: number;
  descripcion?: string;
  tiempo?: string; // minutos u horas, según tu modelo
}

const ServiciosList = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioEditar, setServicioEditar] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const token = localStorage.getItem("token");

const fetchServicios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/servicios");
      const data = await response.json();
      setServicios(data.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };
  useEffect(() => {
    fetchServicios();
  }, []);
    
  const abrirEditarServicio = (servicio: any) => {
  setServicioEditar({ ...servicio });
  setModalVisible(true);
};

const borrarServicio = async (codServicio: string, nombreServicio: string) => {
  if (!window.confirm(`¿Desea eliminar el servicio de ${nombreServicio}?`)) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/servicios/${codServicio}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar");
      alert("Servicio eliminado con éxito");
      fetchServicios(); // Recarga
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar el servicio");
    }
  };
  
const handleEditarServicio = async () => {
  if (!servicioEditar) return;

  try {
    await fetch(`http://localhost:3000/api/servicios/${servicioEditar.codServicio}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombreServicio: servicioEditar.nombreServicio,
        precio: servicioEditar.precio,
        tiempo: servicioEditar.tiempo,
        descripcion: servicioEditar.descripcion
      }),
    });

    alert("Servicio actualizado correctamente");
    setModalVisible(false);
    fetchServicios();
  } catch (error) {
    console.error("Error al editar servicio:", error);
    alert("No se pudo editar el servicio");
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
      <h3>Listado de servicios</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(servicios) &&
          servicios.map((s) => (
            <li
              key={s.codServicio}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "5px",
              }}
            >
              <strong>{s.nombreServicio}</strong>
              <br />
              descripcion : {s.descripcion || "N/A"}
              <br />
              precio: ${s.precio}
              <br />
              {s.tiempo && <span>Duración: {s.tiempo} minutos</span>}
              
              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={() => abrirEditarServicio(s)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#1d8c0fff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "10px"
                  }}
                >
                  ✏ Editar
                </button>
                <button
                    onClick={() => borrarServicio(s.codServicio, s.nombreServicio)}
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
            </li>
          ))}
      </ul>
      {modalVisible && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
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
        width: "380px",
        borderRadius: "8px",
      }}
    >
      <h4>Editar Servicio</h4>

      <label>Nombre del servicio</label>
      <input
        type="text"
        value={servicioEditar.nombreServicio}
        onChange={(e) =>
          setServicioEditar({ ...servicioEditar, nombreServicio: e.target.value })
        }
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Precio</label>
      <input
        type="number"
        value={servicioEditar.precio}
        onChange={(e) =>
          setServicioEditar({ ...servicioEditar, precio: Number(e.target.value) })
        }
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Tiempo</label>
      <input
        type="text"
        value={servicioEditar.tiempo}
        onChange={(e) =>
          setServicioEditar({ ...servicioEditar, tiempo: e.target.value })
        }
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Descripción</label>
      <textarea
        value={servicioEditar.descripcion}
        onChange={(e) =>
          setServicioEditar({ ...servicioEditar, descripcion: e.target.value })
        }
        style={{ width: "100%", height: "70px", marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setModalVisible(false)}
          style={{ padding: "6px 10px", backgroundColor: "#888", color: "white", border: "none" }}
        >
          Cancelar
        </button>

        <button
          onClick={handleEditarServicio}
          style={{ padding: "6px 10px", backgroundColor: "#28a745", color: "white", border: "none" }}
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ServiciosList;
