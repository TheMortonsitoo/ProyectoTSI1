// utils/ventas.ts
export const registrarVenta = async (carrito: any[]) => {
  const token = localStorage.getItem("token");
  const rutCliente = localStorage.getItem("rut");

  if (!carrito.length) throw new Error("Carrito vacío");

  // código base: producto o servicio
  const first = carrito[0];
  
  const codigoBase = first.cod_producto || first.cod_servicio || first.codigo;

  if (!codigoBase) {
  throw new Error(`El primer item del carrito no tiene cod_producto ni cod_servicio: ${JSON.stringify(first)}`);
  }
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const fecha = new Date().toISOString().slice(0, 10);

  // Paso 1: crear la venta
  const ventaRes = await fetch("http://localhost:3000/api/ventas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      codigoBase,
      rutCliente,
      fecha,
      total,
      estadoVenta: "finalizada"
    })
  });

  if (!ventaRes.ok) throw new Error("Error creando venta");
  const ventaData = await ventaRes.json();
  const codVenta = ventaData.data.codVenta; // ← generado en backend

  // Paso 2: registrar detalles
  await Promise.all(
    carrito.map((item) => {
      if (item.cod_producto) {
        return fetch("http://localhost:3000/api/ventasProductos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            cod_venta: codVenta,
            cod_producto: item.cod_producto,
            cantidad: item.cantidad,
            precio_venta: item.precio,
            subtotal: item.precio * item.cantidad
          })
        });
      } else if (item.cod_servicio) {
        return fetch("http://localhost:3000/api/ventasServicios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            cod_venta: codVenta,
            cod_servicio: item.cod_servicio,
            cantidad: item.cantidad ?? 1,
            precio_venta: item.precio,
            subtotal: item.precio * (item.cantidad ?? 1)
          })
        });
      }
    })
  );

  return codVenta;
};
