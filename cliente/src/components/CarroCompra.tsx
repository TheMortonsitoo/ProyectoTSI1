import { useEffect, useState } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const CarroCompra = () => {
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

  // funciones para modificar carrito
  const incrementarCantidad = (titulo: string) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.titulo === titulo ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (titulo: string) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.titulo === titulo ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (titulo: string) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.titulo !== titulo)
    );
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + (item.precio ?? 0) * item.cantidad, 0);

  return (
    <>
      <Button
        variant="light"
        className="position-relative mb-3"
        onClick={() => setVer(true)}
      >
        <BsCart size={24} />
        {carrito.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
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
            <>
              <ListGroup>
                {carrito.map((item, id) => (
                  <ListGroup.Item key={id}>
                    <strong>{item.titulo}</strong>
                    <br />
                    Precio: ${item.precio}
                    <br />
                    Cantidad: {item.cantidad}
                    <br />
                    Subtotal: ${(item.precio ?? 0) * item.cantidad}
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => incrementarCantidad(item.titulo)}
                      >
                        ➕
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => disminuirCantidad(item.titulo)}
                        className="ms-2"
                      >
                        ➖
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => eliminarDelCarrito(item.titulo)}
                        className="ms-2"
                      >
                        ❌
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h5 className="mt-3">Total: ${calcularTotal()}</h5>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CarroCompra;
