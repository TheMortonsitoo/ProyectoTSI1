
import { Row, Col } from "react-bootstrap";
import Cards from "../components/Cards";

const Tienda = () => {
  return (
    <>
      <h2 className="mt-5 mb-4 text-center">Tienda</h2>
      <Row>
        <Col md={4}><Cards titulo="Liquido de frenos" /></Col>
        <Col md={4}><Cards titulo="Aceite 10W 40"  /></Col>
        <Col md={4}><Cards titulo="Filtros de aire" /></Col>
        <Col md={4}><Cards titulo="Filtros de aceite"  /></Col>
      </Row>
    </>
  );
};

export default Tienda;