import { useState, useEffect } from "react";

interface Agenda {
  codAgenda: string;
  fecha: string;
  hora: string;
  patente: string;
  servicio: string;
  estado: string;
  observacionCliente?: string;
}

const MisAgendas = () => {
    const [agendas, setAgendas] = useState<Agenda[]>([]);
    const [agendaEditar, setAgendaEditar] = useState<Agenda | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
    const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
    const HORAS_DISPONIBLES = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
    ];
  const token = localStorage.getItem("token");
  const hoy = new Date().toISOString().split("T")[0];

  // Cargar agendas del cliente
  const fetchAgendas = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/mis-agendas", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

      const data = await response.json();
      setAgendas(data.data || []);
    } catch (error) {
      console.error("Error al cargar agendas:", error);
    }
  };  

  useEffect(() => {
    fetchAgendas();
  }, []);

  // Abrir modal de edición
  const abrirEditarAgenda = (agenda: Agenda) => {
    setAgendaEditar({ ...agenda });
    setModalVisible(true);
  };

  // Guardar cambios
  const guardarCambiosAgenda = async () => {
    if (!agendaEditar) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/calendario/${agendaEditar.codAgenda}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fecha: agendaEditar.fecha,
            hora: agendaEditar.hora,
            observacionCliente: agendaEditar.observacionCliente,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al editar agenda");

      alert("Agenda modificada correctamente");
      setModalVisible(false);
      fetchAgendas();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la agenda");
    }
  };

  // Cancelar agenda
  const cancelarAgenda = async (codAgenda: string) => {
  if (!window.confirm("¿Seguro que quieres cancelar esta agenda?")) return;

  try {
    const res = await fetch(
      `http://localhost:3000/api/calendario/cancelar/${codAgenda}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("Respuesta cancelarAgenda:", res.status, errorBody);
      alert("❌ No se pudo cancelar la agenda");
      return;
    }

    alert("✅ Agenda cancelada correctamente");
    // vuelve a cargar la lista
    fetchAgendas(); // la función que ya usas en el useEffect
  } catch (error) {
    console.error("Error al cancelar agenda:", error);
    alert("❌ Error al cancelar agenda");
  }
};
const cargarHorasDisponibles = async (fecha: string) => {
  try {
    const url = `http://localhost:3000/api/calendario/ocupados?fecha=${fecha}`;
    
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    // Solo guardar horas ocupadas
    const ocupadas = data.data.map((item: any) => item.hora);

    setHorasOcupadas(ocupadas);

    // Filtrar horas del taller
    const libres = HORAS_DISPONIBLES.filter((h) => !ocupadas.includes(h));

    setHorasDisponibles(libres);

  } catch (error) {
    console.error("Error cargando horas disponibles:", error);
  }
};
useEffect(() => {
  if (agendaEditar?.fecha) {
    cargarHorasDisponibles(agendaEditar.fecha);
  }
}, [agendaEditar?.fecha]);


  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h3>Mis Agendas</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {agendas.map((a) => (
          <li
            key={a.codAgenda}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #eee",
              paddingBottom: "6px",
            }}
          >
            <strong>Código:</strong> {a.codAgenda} <br />
            <strong>Fecha:</strong> {a.fecha} <br />
            <strong>Hora:</strong> {a.hora} <br />
            <strong>Servicio:</strong> {a.servicio} <br />
            <strong>Patente:</strong> {a.patente} <br />
            <strong>Estado:</strong> {a.estado} <br />

            {a.observacionCliente && (
              <>
                <strong>Observación:</strong> {a.observacionCliente}
                <br />
              </>
            )}

            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => abrirEditarAgenda(a)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "#1d8c0fff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                ✏ Editar
              </button>

              <button
                onClick={() => cancelarAgenda(a.codAgenda)}
                style={{
                    padding: "4px 8px",
                    backgroundColor: "#ff0000ff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "8px",
                }}
                >
                🗑 Cancelar
                </button>
            </div>
          </li>
        ))}
      </ul>

      {/* MODAL */}
      {modalVisible && agendaEditar && (
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
            
            <label>Fecha</label>
            <input
            type="date"
            name="fecha"
            min={hoy}
            value={agendaEditar.fecha}
            onChange={(e) => {
                const nuevaFecha = e.target.value;

                // actualizar la agenda que estás editando
                setAgendaEditar({
                ...agendaEditar,
                fecha: nuevaFecha,
                });

                // recalcular horas disponibles para esa fecha
                cargarHorasDisponibles(nuevaFecha);
            }}
            style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Hora disponible</label>
            <select
            value={agendaEditar.hora}
            onChange={(e) =>
                setAgendaEditar({
                ...agendaEditar,
                hora: e.target.value,
                })
            }
            style={{ width: "100%", marginBottom: "10px" }}
            >
            <option value="">Seleccione hora</option>

            {horasDisponibles.length === 0 && (
                <option value="" disabled>
                No hay horarios disponibles para esta fecha
                </option>
            )}

            {horasDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                {hora}
                </option>
            ))}
            </select>



            <label>Observación del cliente</label>
            <textarea
              value={agendaEditar.observacionCliente || ""}
              onChange={(e) =>
                setAgendaEditar({
                  ...agendaEditar,
                  observacionCliente: e.target.value,
                })
              }
              style={{ width: "100%", height: "70px", marginBottom: "10px" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setModalVisible(false)}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#888",
                  color: "white",
                  border: "none",
                }}
              >
                Cerrar
              </button>

              <button
                onClick={guardarCambiosAgenda}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisAgendas;
