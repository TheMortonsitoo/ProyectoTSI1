import Servicio from "../../models/Servicio";
import { serviciosIniciales } from "./serviciosbd";

export async function cargarServiciosIniciales() {
  try {
    for (const servicio of serviciosIniciales) {
      await Servicio.upsert(servicio); // Inserta o actualiza según clave única
    }
    console.log("Servicios cargados o actualizados sin duplicados.");
  } catch (error) {
    console.error("Error al cargar Servicios:", error);
  }
}
