import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { registrarVenta } from "../utils/ventas";


const Checkout = () => {
  const [carrito, setCarrito] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) setCarrito(JSON.parse(data));
  }, []);

  const handleFinalizarCompra = async () => {
  const cod_venta = Date.now();
  await registrarVenta(carrito, cod_venta);
  localStorage.removeItem("carrito");
  setCarrito([]);
  alert("Compra registrada con éxito");
};

  return (
    <div>
      <h2>Finalización de Compra</h2>
      {carrito.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <ul>
           <h4 className="mt-5">Carrito</h4>
          {carrito.map((item, id) => (
            <li key={id}>
                a
              {item.titulo} - {item.cantidad} x ${item.precio}
            </li>
          ))}
        </ul>
      )}
       <Button
          variant="primary"
          className="mt-2 ms-2"
          onClick={handleFinalizarCompra}
          >
          Finalizar Compra
      </Button>
    </div>
  );
};

export default Checkout;