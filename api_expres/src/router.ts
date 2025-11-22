import { Router } from "express";
import { agendarServicio, agregarFecha, borrarFecha, editarCalendario, getCalendario } from "./handlers/calendario";
import { agregarProducto, borrarProducto, editarProducto, getProductos, getProductosByID } from "./handlers/productos";
import { agregarCliente, borrarCliente, editarCliente, getClienteByRut, getClientes, login, perfilCliente } from "./handlers/clientes";
import { agregarEmpleado, borrarEmpleado, editarEmpleado, getEmpleadoByRut, getEmpleados } from "./handlers/empleados";
import { agregarPago, getPago, getPagoByID } from "./handlers/pagos";
import { agregarServicio, borrarServicio, editarServicio, getServicioByID, getServicios } from "./handlers/servicios";
import { agregarVehiculo, borrarVehiculo, editarVehiculo, getVehiculoByPatente, getVehiculos } from "./handlers/vehiculosjiji";
import { agregarVenta, borrarVenta, editarVenta, getVentaByID, getVentas } from "./handlers/ventas";
import { agregarVentaProducto, borrarVentaProducto, editarVentaProducto, getVentaProductoByID, getVentasProductos } from "./handlers/ventasProductos";
import { agregarVentaServicio, borrarVentaServicio, editarVentaServicio, getVentaServicioByID, getVentasServicios } from "./handlers/ventasServicios";
import { autenticar, verificarRol } from "./middleware/auth";

const router = Router();

// 📅 CALENDARIO
router.get("/calendario", getCalendario);
router.post("/calendario", agregarFecha);
router.put("/calendario/:id", editarCalendario);
router.delete("/calendario/:id", borrarFecha);
router.post("/calendario/agendar", agendarServicio);

// 👤 CLIENTES
router.post("/cliente/registrar", agregarCliente); // registro abierto
router.post("/login", login);
router.get("/cliente/perfil", autenticar, perfilCliente);

router.get("/clientes", autenticar, verificarRol(["Admin"]), getClientes);
router.get("/clientes/:rut", autenticar, verificarRol(["Admin"]), getClienteByRut);
router.put("/clientes/:rut", autenticar, verificarRol(["Admin"]), editarCliente);
router.delete("/clientes/:rut", autenticar, verificarRol(["Admin"]), borrarCliente);

// 👨‍💼 EMPLEADOS
router.get("/empleados", autenticar, verificarRol(["Admin"]), getEmpleados);
router.get("/empleados/:rut", autenticar, verificarRol(["Admin"]), getEmpleadoByRut);
router.post("/empleados", autenticar, verificarRol(["Admin"]), agregarEmpleado);
router.put("/empleados/:rut", autenticar, verificarRol(["Admin"]), editarEmpleado);
router.delete("/empleados/:rut", autenticar, verificarRol(["Admin"]), borrarEmpleado);

// 💳 PAGOS
router.get("/pagos", autenticar, verificarRol(["Admin"]), getPago);
router.get("/pagos/:id", autenticar, verificarRol(["Admin"]), getPagoByID);
router.post("/pagos", autenticar, verificarRol(["Admin"]), agregarPago);

// 🛒 PRODUCTOS
router.get("/productos", getProductos); // público
router.get("/productos/:id", getProductosByID); // público
router.post("/productos", autenticar, verificarRol(["Admin"]), agregarProducto);
router.put("/productos/:id", autenticar, verificarRol(["Admin"]), editarProducto);
router.delete("/productos/:id", autenticar, verificarRol(["Admin"]), borrarProducto);

// 🛠 SERVICIOS
router.get("/servicios", getServicios); // público
router.get("/servicios/:id", getServicioByID); // público
router.post("/servicios", autenticar, verificarRol(["Admin"]), agregarServicio);
router.put("/servicios/:id", autenticar, verificarRol(["Admin"]), editarServicio);
router.delete("/servicios/:id", autenticar, verificarRol(["Admin"]), borrarServicio);

// 🚗 VEHÍCULOS
router.get("/vehiculosjiji", autenticar, verificarRol(["Admin"]), getVehiculos);
router.get("/vehiculosjiji/:patente", autenticar, verificarRol(["Admin"]), getVehiculoByPatente);
router.post("/vehiculosjiji", autenticar, verificarRol(["Admin"]), agregarVehiculo);
router.put("/vehiculosjiji/:patente", autenticar, verificarRol(["Admin"]), editarVehiculo);
router.delete("/vehiculosjiji/:patente", autenticar, verificarRol(["Admin"]), borrarVehiculo);

// 💰 VENTAS
router.get("/ventas", autenticar, verificarRol(["Admin"]), getVentas);
router.get("/ventas/:id", autenticar, verificarRol(["Admin"]), getVentaByID);
router.post("/ventas", autenticar, verificarRol(["Admin"]), agregarVenta);
router.put("/ventas/:id", autenticar, verificarRol(["Admin"]), editarVenta);
router.delete("/ventas/:id", autenticar, verificarRol(["Admin"]), borrarVenta);

// 📦 VENTA DE PRODUCTOS
router.get("/ventasProductos", autenticar, verificarRol(["Admin"]), getVentasProductos);
router.get("/ventasProductos/:id", autenticar, verificarRol(["Admin"]), getVentaProductoByID);
router.post("/ventasProductos", autenticar, verificarRol(["Admin"]), agregarVentaProducto);
router.put("/ventasProductos/:id", autenticar, verificarRol(["Admin"]), editarVentaProducto);
router.delete("/ventasProductos/:id", autenticar, verificarRol(["Admin"]), borrarVentaProducto);

// 🛠 VENTA DE SERVICIOS
router.get("/ventasServicios", autenticar, verificarRol(["Admin"]), getVentasServicios);
router.get("/ventasServicios/:id", autenticar, verificarRol(["Admin"]), getVentaServicioByID);
router.post("/ventasServicios", autenticar, verificarRol(["Admin"]), agregarVentaServicio);
router.put("/ventasServicios/:id", autenticar, verificarRol(["Admin"]), editarVentaServicio);
router.delete("/ventasServicios/:id", autenticar, verificarRol(["Admin"]), borrarVentaServicio);

export default router;
