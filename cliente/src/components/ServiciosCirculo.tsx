import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ServiciosC = () => {
  const servicios = [
    { icon: "bi bi-speedometer2", texto: "Mantención por kilometraje", link: "/servicios/mantencion" },
    { icon: "bi bi-disc", texto: "Frenos", link: "/servicios/frenos" },
    { icon: "bi bi-palette", texto: "Cambio de Pintura", link: "/servicios/pintura" },
    { icon: "bi bi-battery-charging", texto: "Cambio de Baterias", link: "/servicios/baterias" },
  ];

  return (
    <Container className="text-center my-5">
      <h2 className="fw-bold mb-4">¿QUÉ ESTÁS BUSCANDO?</h2>
      <Row className="justify-content-center">
        {servicios.map((serv, index) => (
          <Col key={index} xs={6} md={3} lg={2} className="mb-4">
            <Link to={serv.link} className="text-decoration-none text-dark">
              <div className="d-flex flex-column align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "red",
                  }}
                >
                  <i className={`${serv.icon} text-white fs-1`}></i>
                </div>
                <p className="mb-0">{serv.texto}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiciosC;


