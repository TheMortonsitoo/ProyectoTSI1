import { Col, Row } from "react-bootstrap";
import CarroCompra from "../components/CarroCompra";
import { productos } from "../data/productos";
import Cards from "../components/Cards";

const Tienda = () => {

   const agregarAlCarrito = (producto: any) => {
    const carritoStorage = localStorage.getItem("carrito");
    const carrito = carritoStorage ? JSON.parse(carritoStorage) : [];
    const nuevoCarrito = [...carrito, producto];
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  return(
    <>
    <Col>
      <div className="position-relative mb-4">
        {/* Título centrado */}
        <h2 className="mt-1 mb-0 text-center">Tienda</h2>

        {/* Carrito fijo a la derecha */}
        <div className="position-absolute end-0 top-50 translate-middle-y">
          <CarroCompra />
        </div>
      </div>
    </Col>

    <Row className="g-2">
      {productos.map((producto, id) => (
          <Col xs={12} sm={6} md={4} lg={3} key={id}>
              <Cards titulo={producto.titulo} imagen={producto.imagen} descripcion={producto.descripcion} onAgregar={()=> agregarAlCarrito(producto)}/>
          </Col>
      ))}
    </Row>
    </>
  )
};

export default Tienda;