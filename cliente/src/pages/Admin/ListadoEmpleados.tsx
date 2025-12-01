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

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/empleados");
        const data = await response.json();

        console.log("Empleados cargados:", data);

        setEmpleados(data.data); // ← carga directa desde backend
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      }
    };

    fetchEmpleados();
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
      <h3>Listado de empleados</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.isArray(empleados) &&
          empleados.map((emp) => (
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
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListadoEmpleados;
