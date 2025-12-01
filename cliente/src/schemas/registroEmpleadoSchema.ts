import { email, minLength, nonEmpty, object, pipe, string } from "valibot";

export const empleadoSchema = object({
  rutEmpleado: pipe(
  string(),
  nonEmpty("RUT obligatorio"),
  ),
  nombres: pipe(
    string(),
    nonEmpty("El nombre es obligatorio"),
  ),

  apellidoPaterno: pipe(
    string(),
    nonEmpty("Apellido paterno requerido"),
  ),

  apellidoMaterno: pipe(
    string(),
    nonEmpty("Apellido materno requerido"),
  ),

  fono: pipe(
    string(),
    nonEmpty("El teléfono es obligatorio"),
  ),

  mail: pipe(
    string(),
    nonEmpty("El correo es obligatorio"),
    email("Correo no válido")
  ),

  contrasena: pipe(
    string(),
    nonEmpty("La contraseña es obligatoria"),
    minLength(6, "Debe tener mínimo 6 caracteres")
  ),
});