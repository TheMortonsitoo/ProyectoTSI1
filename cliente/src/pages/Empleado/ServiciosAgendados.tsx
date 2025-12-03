import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

interface Agenda {
  codAgenda: string;
  fecha: string;
  hora: string;
  patente: string;
  razonVisita: string;
  estado: string;
  observaciones_cliente: string;
  observaciones_empleado: string | null;
}

const ServiciosAsignados = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [agendaSeleccionada, setAgendaSeleccionada] = useState<Agenda | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [observacionEmpleado, setObservacionEmpleado] = useState("");

  // -------------------------------
  // 🔥 CARGAR SERVICIOS ASIGNADOS
  // -------------------------------
  const cargarAgendas = async () => {
    try {
      const token = localStorage.getItem("token");
      const rutEmpleado = localStorage.getItem("rut");

      const res = await axios.get(
        `http://localhost:3000/api/calendario/empleados/${rutEmpleado}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setAgendas(res.data.data || []);
    } catch (err) {
      console.error("Error cargando agendas del empleado:", err);
    }
  };

  useEffect(() => {
    cargarAgendas();
  }, []);

  // -------------------------------
  // 🔥 ABRIR MODAL
  // -------------------------------
  const abrirModal = (agenda: Agenda) => {
    setAgendaSeleccionada(agenda);
    setObservacionEmpleado(agenda.observaciones_empleado || "");
    setShowModal(true);
  };

  // -------------------------------
  // 🔥 GUARDAR OBSERVACIÓN
  // -------------------------------
  const guardarObservacion = async () => {
    if (!agendaSeleccionada) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/calendario/observacion-empleado/${agendaSeleccionada.codAgenda}`,
        { observaciones_empleado: observacionEmpleado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowModal(false);
      cargarAgendas();
    } catch (err) {
      console.error("Error guardando observación:", err);
    }
  };


  // -------------------------------
  // 🔥 CAMBIAR ESTADO
  // -------------------------------
  const cambiarEstado = async (codAgenda: string, estado: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/calendario/cambiar-estado/${codAgenda}`,
        { estado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      cargarAgendas();
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };


  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Servicios asignados</h3>
      <p className="text-muted">Aquí puedes actualizar tus servicios del día.</p>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Patente</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Observación Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {agendas.map((a) => (
            <tr key={a.codAgenda}>
              <td>{a.codAgenda}</td>
              <td>{a.fecha}</td>
              <td>{a.hora}</td>
              <td>{a.patente}</td>
              <td>{a.razonVisita}</td>
              <td>
                <span
                  className={`badge ${
                    a.estado === "pendiente"
                      ? "bg-info"
                      : a.estado === "en progreso"
                      ? "bg-warning"
                      : a.estado === "finalizada"
                      ? "bg-success"
                      : a.estado === "cancelado"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {a.estado}
                </span>
              </td>
              <td>{a.observaciones_cliente || "-"}</td>

              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => abrirModal(a)}
                >
                  Observación
                </Button>

                <Button
                  size="sm"
                  variant="success"
                  className="me-1"
                  onClick={() => cambiarEstado(a.codAgenda, "en progreso")}
                >
                  En progreso
                </Button>

                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => cambiarEstado(a.codAgenda, "finalizada")}
                >
                  Finalizado
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="ms-1"
                  onClick={() => cambiarEstado(a.codAgenda, "cancelado")}
                >
                  Cancelar
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* -------- MODAL -------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar observación del mecánico</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={observacionEmpleado}
              onChange={(e) => setObservacionEmpleado(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarObservacion}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiciosAsignados;
