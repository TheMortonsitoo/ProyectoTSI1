export const registrarVenta = async (carrito: any[]) => {
  const token = localStorage.getItem("token");
  const rutCliente = localStorage.getItem("rut");

  if (!carrito.length) throw new Error("Carrito vacío");

  const fecha = new Date().toISOString().slice(0, 10);

  // 📌 Construir array de productos según lo que espera el backend
  const productos = carrito.map(item => ({
    codProducto: item.cod_producto,
    cantidad: item.cantidad,
  }));

  console.log("Payload enviado al backend:", {
    rutCliente,
    fecha,
    productos,
    estadoVenta: "finalizada"
  });

  // 📌 Paso 1: crear venta
  const ventaRes = await fetch("http://localhost:3000/api/ventas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      rutCliente,
      fecha,
      productos,       // ← AHORA SÍ ENVIAMOS ESTO
      estadoVenta: "finalizada"
    })
  });

  if (!ventaRes.ok) throw new Error("Error creando venta");

  const ventaData = await ventaRes.json();
  return ventaData.venta.codVenta;
};
