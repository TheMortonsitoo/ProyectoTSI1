import { useState, useEffect } from "react";

interface Empleado {
  rutEmpleado: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fono: string;
  mail: string;
  rol: string;
}

const ListadoEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const token = localStorage.getItem("token");
  const [EmpleadoEditar, setEmpleadoEditar] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/empleados");
      const data = await response.json();

      console.log("Empleados cargados:", data);

      setEmpleados(data.data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const abrirEditarEmpleado = (servicio: any) => {
    setEmpleadoEditar({ ...servicio });
    setModalVisible(true);
  };

  const handleEditarEmpleado = async () => {
    if (!EmpleadoEditar) return;

    try {
      await fetch(`http://localhost:3000/api/empleados/${EmpleadoEditar.rutEmpleado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombres: EmpleadoEditar.nombres,
          apellidoPaterno: EmpleadoEditar.apellidoPaterno,
          apellidoMaterno: EmpleadoEditar.apellidoMaterno,
          fono: EmpleadoEditar.fono,
          mail: EmpleadoEditar.mail,
        }),
      });

      alert("Servicio actualizado correctamente");
      setModalVisible(false);
      fetchEmpleados();
    } catch (error) {
      console.error("Error al editar servicio:", error);
      alert("No se pudo editar el servicio");
    }
  };

  const borrarEmpleado = async (rutEmpleado: string, nombres: string, apellidoPaterno: string) => {
    if (!window.confirm(`¿Desea eliminar a ${nombres} ${apellidoPaterno}?`)) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/empleados/${rutEmpleado}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar");

      alert("✅ Empleado eliminado con éxito");
      fetchEmpleados();
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar el empleado");
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
      <h3>Listado de empleados</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(empleados) &&
          empleados
            .filter((emp) => emp.rol === "empleado") // 👈 SOLO MUESTRA EMPLEADOS
            .map((emp) => (
              <li
                key={emp.rutEmpleado}
                style={{
                  marginBottom: "12px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "6px",
                }}
              >
                <strong>
                  {emp.nombres} {emp.apellidoPaterno} {emp.apellidoMaterno}
                </strong>
                <br />
                <span>RUT: {emp.rutEmpleado}</span>
                <br />
                <span>Correo: {emp.mail}</span>
                <br />
                <span>Teléfono: {emp.fono}</span>
                <br />
                <span>Rol: {emp.rol}</span>
                <br />
                <div style={{ marginTop: "8px" }}>
                  <button
                    onClick={() => abrirEditarEmpleado(emp)}
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
                      onClick={() => borrarEmpleado(emp.rutEmpleado, emp.nombres, emp.apellidoPaterno)}
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
            <h4>Editar empleado</h4>

            <label>Nombre del empleado</label>
            <input
              className="form-control mb-2"
              value={EmpleadoEditar.nombres}
              onChange={(e) =>
                setEmpleadoEditar({ ...EmpleadoEditar, nombres: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Apellido Paterno</label>
            <input
              className="form-control mb-2"
              value={EmpleadoEditar.apellidoPaterno}
              onChange={(e) =>
                setEmpleadoEditar({ ...EmpleadoEditar, apellidoPaterno: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Apellido Materno</label>
            <input
              className="form-control mb-2"
              value={EmpleadoEditar.apellidoMaterno}
              onChange={(e) =>
                setEmpleadoEditar({ ...EmpleadoEditar, apellidoMaterno: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Teléfono</label>
            <input
              className="form-control mb-2"
              type="number"
              value={EmpleadoEditar.fono}
              onChange={(e) =>
                setEmpleadoEditar({ ...EmpleadoEditar, fono: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Correo</label>
            <input
              className="form-control mb-2"
              type="mail"
              value={EmpleadoEditar.mail}
              onChange={(e) =>
                setEmpleadoEditar({ ...EmpleadoEditar, mail: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setModalVisible(false)}
                style={{ padding: "6px 10px", backgroundColor: "#888", color: "white" }}
              >
                Cancelar
              </button>

              <button
                onClick={handleEditarEmpleado}
                style={{ padding: "6px 10px", backgroundColor: "#28a745", color: "white" }}
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

export default ListadoEmpleados;
