import { object, string, minLength, email, pipe } from "valibot";

export const RegistroSchema = object({
  rutCliente: string("El RUT es obligatorio"),
  nombre: string("El nombre es obligatorio"),
  apellidoPaterno: string("El apellido paterno es obligatorio"),
  apellidoMaterno: string("El apellido materno es obligatorio"),
  direccion: string("La dirección es obligatoria"),
  fono: string("El teléfono es obligatorio"),

  mail: pipe(
    string("El correo es obligatorio"),
    email("Correo no válido")  
  ),

  contrasena: pipe(
    string("La contraseña es obligatoria"),
    minLength(6, "Debe tener mínimo 6 caracteres")
  )
});

