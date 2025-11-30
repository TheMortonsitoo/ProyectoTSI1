import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { registrarVenta } from "../utils/ventas";


const Checkout = () => {
  const [carrito, setCarrito] = useState<any[]>([]);

  useEffect(() => {
  const data = localStorage.getItem("carrito");
  if (data) {
    const parsed = JSON.parse(data);
    console.log("🛒 Carrito cargado:", parsed);  // ← AQUI
    setCarrito(parsed);
  }
}, []);


const handleFinalizarCompra = async () => {
  console.log("carrito:", carrito);

  try {
    const codVenta = await registrarVenta(carrito);
    localStorage.removeItem("carrito");
    setCarrito([]);
    alert(`Compra registrada con éxito. Código: ${codVenta}`);
  } catch (error) {
    console.error("Error al finalizar compra:", error);
    alert("Hubo un problema al registrar la venta");
  }
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
              
              {item.titulo} - {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
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