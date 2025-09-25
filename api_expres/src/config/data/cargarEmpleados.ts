import Empleado from "../../models/Empleado";
import { empleados } from "./empleados";

export async function cargarEmpleadosIniciales() {
  try {
    for (const empleado of empleados) {
      await Empleado.upsert(empleado); // Inserta o actualiza según clave única
    }
    console.log("Empleados cargados o actualizados sin duplicados.");
  } catch (error) {
    console.error("Error al cargar Empleados:", error);
  }
}
