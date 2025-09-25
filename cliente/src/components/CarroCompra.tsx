import { useEffect, useState } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap"
import { BsCart } from "react-icons/bs"

const CarroCompra = () => {

      //---------------------------------------------------
  const [carrito, setCarrito] = useState<any[]>([]);
  const [ver, setVer] = useState(false);

  useEffect(() => {
    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      setCarrito(JSON.parse(carritoStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  //--------------------------------------------------- Todo eso es el localStorage
  /*Ese para agregar el producto al carro asd
  const agregarAlCarrito = (producto: any) => {
    setCarrito((carritoActual) => [...carritoActual, producto]);
  };
    */
  return (
    <>
    <Button //Boton del carrito
        variant="light" 
        className="position-relative mb-3" 
        onClick={() => setVer(true)}
        >
        <BsCart size={24} />
        {carrito.length > 0 && (
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {carrito.length}
          </span>
        )}
    </Button>
    <Offcanvas show={ver} onHide={() => setVer(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ListGroup>
              {carrito.map((item, idx) => (
                <ListGroup.Item key={idx}>{item.titulo}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Offcanvas.Body>
    </Offcanvas>
    </>
  )
}
export default CarroCompra