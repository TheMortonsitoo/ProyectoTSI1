import { Button, Col, ListGroup, Offcanvas, Row } from "react-bootstrap";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Tienda = () => {

  const [carrito, setCarrito] = useState<any[]>(() => {
    const carritoStorage = localStorage.getItem("carrito");
    return carritoStorage ? JSON.parse(carritoStorage) : [];
  });

  const [ver, setVer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    localStorage.removeItem("carrito"); 
  }
}, [carrito]);;

  //--------------------------------------------------- Todo eso es el localStorage
  const agregarAlCarrito = (producto: any) => {
  setCarrito((carritoActual) => {
    const existe = carritoActual.find((item) => item.titulo === producto.titulo);

    // Si ya existe en el carrito
    if (existe) {
      // Si ya alcanzó el stock, NO agregar más
      if (existe.cantidad >= producto.stock) {
        alert(`No hay más unidades disponibles. Stock máximo: ${producto.stock}`);
        return carritoActual;
      }

      return carritoActual.map((item) =>
        item.titulo === producto.titulo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    }

    // Si no existe, verificar stock antes de agregar
    if (producto.stock <= 0) {
      alert("Este producto no tiene stock disponible.");
      return carritoActual;
    }

    return [...carritoActual, { ...producto, cantidad: 1 }];
  });
};

  const [productos, setProductos] = useState<any[]>([]);

useEffect(() => {
  fetch("http://localhost:3000/api/productos")
    .then((res) => res.json())
    .then((data) => {
      console.log("Productos cargados:", data); // esto debe mostrar algo
      setProductos(data.data);
    })
    .catch((err) => {
      console.error("Error cargando productos:", err); // asegúrate de ver esto si falla
    });
}, []);


  //suma 1
  const incrementarCantidad = (titulo: string) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) => {
        if (item.titulo === titulo) {
          if (item.cantidad >= item.stock) {
            alert(`No puedes agregar más. Stock disponible: ${item.stock}`);
            return item;
          }
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      })
    );
  };
//resta 1
  const disminuirCantidad = (titulo: string) => {
    setCarrito((carritoActual) =>
      carritoActual.map((item) => item.titulo === titulo ? { ...item, cantidad: item.cantidad - 1 } : item).filter((item) => item.cantidad > 0)
    );
  };
  //elimina todo
  const eliminarDelCarrito = (titulo: string) => {
  setCarrito((carritoActual) => {
    // Filtrar todos los que NO sean el producto con ese título
    const nuevoCarrito = carritoActual.filter((item) => item.titulo !== titulo);

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    return nuevoCarrito;
  });
};
  //calcula total
  const calcularTotal = () => {
    return carrito.reduce(
      (acc, item) => acc + (item.precio ?? 0) * item.cantidad,0);
  };

  return(
    <>
    <Col>
      <div className="position-relative mb-4">
        <h2 className="mt-1 mb-0 text-center">Tienda</h2>
        <div className="position-absolute end-0 top-50 translate-middle-y">
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
                  <>
                  <ListGroup>
                    {carrito.map((item, id) => (
                      <ListGroup.Item key={id}>{item.titulo}
                        <div>   
                          <small>
                            
                          </small>
                        </div>
                          <a>Cantidad :</a>
                          <span>{item.cantidad}</span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => incrementarCantidad(item.titulo)}
                            style={{ marginLeft: '20px' }}
                          >
                            ➕
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => disminuirCantidad(item.titulo)}
                          >
                            ➖
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => eliminarDelCarrito(item.titulo)}
                            style={{ marginLeft: '20px' }}
                          >
                            ❌
                          </Button>
                          <br />
                          <small>Subtotal: ${(item.precio ?? 0) * item.cantidad}</small>

                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                    <h5 className="mt-3">
                    Total: ${calcularTotal().toLocaleString()}
                  </h5>
                  <Button
                    variant="danger"
                    className="mt-2 me-2"
                    onClick={() => setCarrito([])}
                  >
                    Vaciar carrito
                  </Button>
                  <Button
                    variant="primary"
                    className="mt-2 ms-2"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                  </Button>
                  </>
                )}
              </Offcanvas.Body>
            </Offcanvas>
        </div>
      </div>
    </Col>
    <Row className="g-2">
{/* Verifica que productos sea un arreglo verdadero antes de intentar recorrerlo. 
[...productos] copia el arreglo de todo para asi no modificar el original
sort((a, b) => b.stock - a.stock) Este es el ordenamiento. */}
{Array.isArray(productos) && [...productos].sort((a, b) => b.stock - a.stock).map((producto, id) => (
    <Col xs={12} sm={6} md={4} lg={3} key={id}>
      <Cards
        titulo={producto.nombreProducto}
        descripcion={producto.descripcion}
        precio={Number(producto.precioUnitario ?? 0)}
        stock={producto.stock}
        onAgregar={() =>
          agregarAlCarrito({
            cod_producto: producto.codProducto,
            titulo: producto.nombreProducto,
            descripcion: producto.descripcion,
            precio: Number(producto.precioUnitario ?? 0),
            stock: producto.stock,
            cantidad: 1
          })
        }
      />
    </Col>
  ))}

    </Row>
    </>
  )
};

export default Tienda;