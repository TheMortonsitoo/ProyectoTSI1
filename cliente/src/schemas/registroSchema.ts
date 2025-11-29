import { object, string, minLength, email, pipe, nonEmpty } from "valibot";

export const RegistroSchema = object({
  rutCliente: pipe(
    string(),
    nonEmpty("El RUT es obligatorio")
  ),
  nombre: pipe(
    string(),
    nonEmpty("El nombre es obligatorio")
  ),
  apellidoPaterno: pipe(
    string(),
    nonEmpty("El apellido paterno es obligatorio")
  ),
  apellidoMaterno: pipe(
    string(),
    nonEmpty("El apellido materno es obligatorio")
  ),
  direccion: pipe(
    string(),
    nonEmpty("La dirección es obligatoria")
  ),
  fono: pipe(
    string(),
    nonEmpty("El teléfono es obligatorio")
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

