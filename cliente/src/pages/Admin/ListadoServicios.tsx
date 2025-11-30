import { useState, useEffect } from "react";

interface Servicio {
  codServicio: string;
  nombreServicio: string;
  precio: number;
  descripcion?: string;
  duracion?: string; // minutos u horas, según tu modelo
}

const ServiciosList = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/servicios");
        const data = await response.json();
        console.log("Servicios cargados:", data);
        setServicios(data.data); // 👈 usa directamente el array
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      }
    };

    fetchServicios();
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
              precio: ${s.precio}
              <br />
              {s.duracion && <span>Duración: {s.duracion}</span>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ServiciosList;
