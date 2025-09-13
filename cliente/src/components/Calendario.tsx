import { Container, Row, Col, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const Agendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Container fluid className="my-5">
      <Row>
        {/* Columna izquierda con imagen de fondo */}
        <Col
          md={6}
          className="text-white d-flex flex-column justify-content-center p-5"
          style={{
            backgroundImage: "url('/images/TallerMoto.jpg')", // 📌 usa tu imagen
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "30px" }}>
            <h2 className="fw-bold mb-4">¿CÓMO AGENDAR?</h2>
            <p>
              Para brindarle una atención personalizada y valorando su tiempo,
              hemos implementado un sistema de agendamiento de servicios.
              Sigue estos tres simples pasos para reservar tu cita:
            </p>

            <h4 className="fw-bold mt-4">PASO 1</h4>
            <p>Selecciona el servicio que necesites agendar.</p>

            <h4 className="fw-bold">PASO 2</h4>
            <p>Escoge el día y la hora que más te acomoda.</p>

            <h4 className="fw-bold">PASO 3</h4>
            <p>
              Llena tus datos y los de tu vehículo. Al agendar te enviaremos un
              correo confirmando tu cita.
            </p>
          </div>
        </Col>

        {/* Columna derecha con calendario */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center p-5"
        >
          <h4 className="fw-bold text-danger mb-3">
            {date.toLocaleDateString("es-CL", { month: "long", year: "numeric" }).toUpperCase()}
          </h4>

          {/* Calendario */}
          

            <Calendar
            onChange={(value) => {
                if (value instanceof Date) {
                setDate(value);
                }
            }}
            tileDisabled={({ date, view }) =>
                view === "month" && date < new Date(new Date().setHours(0,0,0,0))
            }
            value={date}
            />

          {/* Botón agendar */}
          <Button
            variant="danger"
            className="px-4 py-2 rounded-pill shadow-lg"
          >
            <i className="bi bi-calendar-check me-2"></i>
            AGENDAR SERVICIO
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Agendar;
