import { agendarServicio, agregarFecha, borrarFecha, editarCalendario, getCalendario } from "../handlers/calendario";
import { agregarProducto, borrarProducto, editarProducto, getProductos, getProductosByID } from "../handlers/productos";
import { agregarCliente, borrarCliente, editarCliente, getClienteByRut, getClientes, perfilCliente } from "../handlers/clientes";
import { agregarEmpleado, borrarEmpleado, editarEmpleado, getEmpleadoByRut, getEmpleados, perfilEmpleado } from "../handlers/empleados";
import { agregarPago, getPago, getPagoByID } from "../handlers/pagos";
import { agregarServicio, borrarServicio, editarServicio, getServicioByID, getServicios } from "../handlers/servicios";
import { agregarVehiculo, borrarVehiculo, editarVehiculo, getVehiculoByPatente, getVehiculos, getVehiculosByCliente } from "../handlers/vehiculosjiji";
import { agregarVenta, borrarVenta, editarVenta, getVentaByID, getVentas } from "../handlers/ventas";
import { agregarVentaProducto, borrarVentaProducto, editarVentaProducto, getVentaProductoByID, getVentasProductos } from "../handlers/ventasProductos";
import { agregarVentaServicio, borrarVentaServicio, editarVentaServicio, getVentaServicioByID, getVentasServicios } from "../handlers/ventasServicios";
import { autenticar, verificarRol } from "../middleware/auth";
import { sincronizarAdmins } from "../handlers/sincronizarAdmins";
import { Router } from "express";

import { login } from "../controllers/authController";
import authRoutes from "./auth.routes";
import { perfilAdmin } from "../handlers/admin";

const router = Router();
router.use("/auth", authRoutes);

// 📅 CALENDARIO
router.get("/calendario", getCalendario);
router.post("/calendario", agregarFecha);
router.put("/calendario/:id", editarCalendario);
router.delete("/calendario/:id", borrarFecha);
router.post("/calendario/agendar", agendarServicio);

// 👤 CLIENTES
router.post("/cliente/registrar", agregarCliente); // registro abierto
router.get("/clientes/perfil", autenticar,verificarRol(["cliente"]), perfilCliente);
router.get("/clientes", autenticar, verificarRol(["admin"]), getClientes);
router.get("/clientes/:rut", autenticar, verificarRol(["admin"]), getClienteByRut);
router.put("/clientes/:rut", autenticar, verificarRol(["admin"]), editarCliente);
router.delete("/clientes/:rut", autenticar, verificarRol(["admin"]), borrarCliente);

//Admin
router.get("/admin/perfil", autenticar, verificarRol(["admin"]), perfilAdmin);


// 👨‍💼 EMPLEADOS
router.get("/empleados", getEmpleados);
router.get("/empleados/perfil", autenticar, verificarRol(["empleado", "admin"]), perfilEmpleado);
router.get("/empleados/:rut", autenticar, verificarRol(["admin"]), getEmpleadoByRut);
router.post("/empleados", autenticar, verificarRol(["admin"]), agregarEmpleado);
router.put("/empleados/:rut", autenticar, verificarRol(["admin"]), editarEmpleado);
router.delete("/empleados/:rut", autenticar, verificarRol(["admin"]), borrarEmpleado);

// 💳 PAGOS
router.get("/pagos", autenticar, verificarRol(["admin"]), getPago);
router.get("/pagos/:id", autenticar, verificarRol(["admin"]), getPagoByID);
router.post("/pagos", autenticar, verificarRol(["admin"]), agregarPago);

// 🛒 PRODUCTOS
router.get("/productos", getProductos); // público
router.get("/productos/:id", getProductosByID); // público
router.post("/productos", autenticar, verificarRol(["admin"]), agregarProducto);
router.put("/productos/:id", autenticar, verificarRol(["admin"]), editarProducto);
router.delete("/productos/:id", autenticar, verificarRol(["admin"]), borrarProducto);

// 🛠 SERVICIOS
router.get("/servicios", getServicios); // público
router.get("/servicios/:id", getServicioByID); // público
router.post("/servicios", autenticar, verificarRol(["admin"]), agregarServicio);
router.put("/servicios/:id", autenticar, verificarRol(["admin"]), editarServicio);
router.delete("/servicios/:id", autenticar, verificarRol(["admin"]), borrarServicio);

// 🚗 VEHÍCULOS
router.get("/vehiculosjiji", autenticar, verificarRol(["cliente","empleado","admin"]), getVehiculos);
router.get("/vehiculosjiji/:patente", autenticar, verificarRol(["admin"]), getVehiculoByPatente);
router.post("/vehiculosjiji", autenticar, verificarRol(["cliente","empleado","admin"]), agregarVehiculo);
router.put("/vehiculosjiji/:patente", autenticar, verificarRol(["admin"]), editarVehiculo);
router.delete("/vehiculosjiji/:patente", autenticar, verificarRol(["admin"]), borrarVehiculo);

router.get("/vehiculosjiji/cliente/:rutCliente", autenticar, verificarRol(["cliente","empleado","admin"]), getVehiculosByCliente);

// 💰 VENTAS
router.get("/ventas", autenticar, verificarRol(["admin", "cliente"]), getVentas);
router.get("/ventas/:id", autenticar, verificarRol(["admin"]), getVentaByID);
router.post("/ventas", autenticar, verificarRol(["admin", "cliente"]), agregarVenta);
router.put("/ventas/:id", autenticar, verificarRol(["admin"]), editarVenta);
router.delete("/ventas/:id", autenticar, verificarRol(["admin"]), borrarVenta);

// 📦 VENTA DE PRODUCTOS
router.get("/ventasProductos", autenticar, verificarRol(["admin"]), getVentasProductos);
router.get("/ventasProductos/:id", autenticar, verificarRol(["admin"]), getVentaProductoByID);
router.post("/ventasProductos", autenticar, verificarRol(["admin"]), agregarVentaProducto);
router.put("/ventasProductos/:id", autenticar, verificarRol(["admin"]), editarVentaProducto);
router.delete("/ventasProductos/:id", autenticar, verificarRol(["admin"]), borrarVentaProducto);

// 🛠 VENTA DE SERVICIOS
router.get("/ventasServicios", autenticar, verificarRol(["admin"]), getVentasServicios);
router.get("/ventasServicios/:id", autenticar, verificarRol(["admin"]), getVentaServicioByID);
router.post("/ventasServicios", autenticar, verificarRol(["admin"]), agregarVentaServicio);
router.put("/ventasServicios/:id", autenticar, verificarRol(["admin"]), editarVentaServicio);
router.delete("/ventasServicios/:id", autenticar, verificarRol(["admin"]), borrarVentaServicio);

router.post("/sincronizar-admins", autenticar, verificarRol(["admin"]), sincronizarAdmins);


export default router;
