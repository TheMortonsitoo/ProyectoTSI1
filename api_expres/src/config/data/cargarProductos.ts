// data/cargarProductos.ts
import Producto from "../../models/Producto";
import { productos } from "./productosbd";

export async function cargarProductosIniciales() {
  try {
    for (const producto of productos) {
      await Producto.upsert(producto); // Inserta o actualiza según clave única
    }
    console.log("✅ Productos cargados o actualizados sin duplicados.");
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
  }
}
