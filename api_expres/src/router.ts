import { Router } from "express";
import { agregarFecha, borrarFecha, editarCalendario, getCalendario } from "./handlers/calendario";
import { agregarProducto, borrarProducto, editarProducto, getProductos, getProductosByID } from "./handlers/productos";

const router = Router()

//RUTA CALENDARIO
router.get("/calendario", getCalendario)
router.post("/calendario", agregarFecha)
router.put("/calendario/:id", editarCalendario)
router.delete("/calendario/:id", borrarFecha)

//RUTA DE PRODUCTOS
router.get("/productos", getProductos)
router.get("/productos/:id", getProductosByID)
router.post("/productos", agregarProducto)
router.put("/productos/:id", editarProducto)
router.delete("/productos/:id", borrarProducto)

export default router