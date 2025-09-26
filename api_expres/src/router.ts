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
import { autenticar } from "./middleware/auth";



const router = Router()

//RUTA DE CALENDARIO
router.get("/calendario", getCalendario)
router.post("/calendario", agregarFecha)
router.put("/calendario/:id", editarCalendario)
router.delete("/calendario/:id", borrarFecha)
router.post("/calendario/agendar", agendarServicio)

//RUTA DE CLIENTES
router.get("/clientes", getClientes)
router.get("/clientes/:rut", getClienteByRut)
router.post("/clientes", agregarCliente)
router.put("/clientes/:rut", editarCliente)
router.delete("/clientes/:rut", borrarCliente)

//RUTA DE EMPLEADOS
router.get("/empleados", getEmpleados)
router.get("/empleados/:rut", getEmpleadoByRut)
router.post("/empleados", agregarEmpleado)
router.put("/empleados/:rut", editarEmpleado)
router.delete("/empleados/:rut", borrarEmpleado)

//RUTA DE PAGOS
router.get("/pagos", getPago)
router.get("/pagos/:it", getPagoByID)
router.post("/pagos", agregarPago)

//RUTA DE PRODUCTOS
router.get("/productos", getProductos)
router.get("/productos/:id", getProductosByID)
router.post("/productos", agregarProducto)
router.put("/productos/:id", editarProducto)
router.delete("/productos/:id", borrarProducto)

//RUTA DE SERVICIOS
router.get("/servicios", getServicios)
router.get("/servicios/:id", getServicioByID)
router.post("/servicios", agregarServicio)
router.put("/servicios/:id", editarServicio)
router.delete("/servicios/:id", borrarServicio)

//RUTA DE VEHICULOS
router.get("/vehiculosjiji", getVehiculos)
router.get("/vehiculosjiji/:patente", getVehiculoByPatente)
router.post("/vehiculosjiji", agregarVehiculo)
router.put("/vehiculosjiji/:patente", editarVehiculo)
router.delete("/vehiculosjiji/:patente", borrarVehiculo)

//RUTA DE VENTAS
router.get("/ventas", getVentas)
router.get("/ventas/:id", getVentaByID)
router.post("/ventas", agregarVenta)
router.put("/ventas/:id", editarVenta)
router.delete("/ventas/:id", borrarVenta)

//RUTA DE VENTA DE PRODUCTOS
router.get("/ventasProductos", getVentasProductos)
router.get("/ventasProductos/:id", getVentaProductoByID)
router.post("/ventasProductos", agregarVentaProducto)
router.put("/ventasProductos/:id", editarVentaProducto)
router.delete("/ventasProductos/:id", borrarVentaProducto)

//RUTA DE VENTA DE SERVICIOS
router.get("/ventasServicios", getVentasServicios)
router.get("/ventasServicios/:id", getVentaServicioByID)
router.post("/ventasServicios", agregarVentaServicio)
router.put("/ventasServicios/:id", editarVentaServicio)
router.delete("/ventasServicios/:id", borrarVentaServicio)

router.post('/login', login)
router.post('/cliente/registrar', agregarCliente)
router.get("/cliente/perfil", autenticar, perfilCliente);
export default router