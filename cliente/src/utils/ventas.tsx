// utils/ventas.ts
export const registrarVenta = async (carrito: any[], codVenta: number | string) => {
  await Promise.all(
    carrito.map((item) =>
      fetch('http://localhost:3000/ventas-productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codProducto: item.id,
          codVenta,   
          cantidad: item.cantidad,
          precioVenta: item.precio,
          subtotal: item.precio * item.cantidad,
        }),
      })
    )
  );
};
