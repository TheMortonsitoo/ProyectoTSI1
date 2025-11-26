import Empleado from "../../models/Empleado";
import { empleados } from "./empleados";
import bcrypt from "bcrypt";

export async function cargarEmpleadosIniciales() {
  try {
    for (const empleado of empleados) {

      if(!empleado.contrasena.startsWith('$2b$')) {
        const hashed = await bcrypt.hash(empleado.contrasena, 10);
        empleado.contrasena = hashed;
      }
      await Empleado.upsert(empleado); // Inserta o actualiza según clave única
    }
    console.log("Empleados cargados o actualizados sin duplicados.");
  } catch (error) {
    console.error("Error al cargar Empleados:", error);
  }
}
