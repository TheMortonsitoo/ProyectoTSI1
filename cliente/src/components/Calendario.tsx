import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";



    const Agenda = () => {

      const [date, setDate] = useState(new Date());
      const navigate = useNavigate();

    return (
    <Container fluid className="my-5">
      <Row>
        {/* Columna izquierda con info */}
        <Col md={6} className="text-white d-flex flex-column justify-content-center p-5"
          style={{
            backgroundImage: "url('/images/TallerMoto.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px"
          }}
        >
          <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "30px" }}>
            <h2 className="fw-bold mb-4">¿CÓMO AGENDAR?</h2>
            <p>Selecciona el servicio, día, hora y mecánico que prefieras.</p>
          </div>
        </Col>

        {/* Columna derecha con formulario */}
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center p-5">
          <h4 className="fw-bold text-danger mb-3">
            {date.toLocaleDateString("es-CL", { month: "long", year: "numeric" }).toUpperCase()}
          </h4>

          {/* Calendario */}
          <Calendar
            onChange={(value) => value instanceof Date && setDate(value)}
            tileDisabled={({ date, view }) =>
              view === "month" && date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            value={date}
          />

          {/* Botón */}
          <Button
            variant="danger"
            className="px-4 py-2 rounded-pill shadow-lg mt-4"
            onClick={() => navigate('/agenda')}
          >
            <i className="bi bi-calendar-check me-2"></i>
            AGENDAR SERVICIO
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Agenda;