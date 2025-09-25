import { useEffect, useState } from "react";

const Checkout = () => {
  const [carrito, setCarrito] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("carrito");
    if (data) setCarrito(JSON.parse(data));
  }, []);

  return (
    <div>
      <h2>Finalización de Compra</h2>
      {carrito.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <ul>
           <h4 className="mt-5">Carrito</h4>
          {carrito.map((item, idx) => (
            <li key={idx}>
                a
              {item.titulo} - {item.cantidad} x ${item.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Checkout;