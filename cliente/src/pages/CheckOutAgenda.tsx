import { useEffect, useState } from "react";
import axios from "axios";

interface Servicio {
  codServicio: number;
  nombreServicio: string;
  precio: number;
  tiempo: string;
}

const AgendarServicio = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<number | null>(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/servicios");
        setServicios(response.data);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };
    fetchServicios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post("http://localhost:3000/api//calendario/agendar", {
        rutCliente: "12345678-9", // ⚠️ Mejor sacarlo del token/perfil
        codServicio: servicioSeleccionado,
        fecha,
        hora
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Servicio agendado con éxito ✅");
    } catch (error) {
      console.error("Error al agendar:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agendar Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Servicio</label>
          <select
            className="form-control"
            value={servicioSeleccionado ?? ""}
            onChange={(e) => setServicioSeleccionado(Number(e.target.value))}
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((s) => (
              <option key={s.codServicio} value={s.codServicio}>
                {s.nombreServicio} - ${s.precio} ({s.tiempo})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Hora</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <button className="btn btn-danger" type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default AgendarServicio;