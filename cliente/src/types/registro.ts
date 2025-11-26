import { object, string, minLength, email, nonEmpty, pipe } from "valibot";

export const RegistroSchema = object({
  rutCliente: pipe(string(), nonEmpty("Debe ingresar su RUT")),
  nombre: pipe(string(), nonEmpty("Debe ingresar su nombre")),
  apellidoPaterno: pipe(string(), nonEmpty("Debe ingresar apellido paterno")),
  apellidoMaterno: pipe(string(), nonEmpty("Debe ingresar apellido materno")),
  direccion: pipe(string(), nonEmpty("Debe ingresar una dirección")),
  fono: pipe(string(), nonEmpty("Debe ingresar un teléfono")),
  mail: pipe(string(), email("Correo inválido")),
  contrasena: pipe(
    string(),
    minLength(6, "La contraseña debe tener mínimo 6 caracteres")
  ),
});
