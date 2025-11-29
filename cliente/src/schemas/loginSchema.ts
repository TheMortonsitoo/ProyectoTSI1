import { nonEmpty, object, pipe, string } from "valibot";

export const LoginFormSchema = object({
    mail: pipe(string(), nonEmpty("Indique su correo electrónico")),
    contrasena : pipe(string(), nonEmpty("Indique su contraseña")),
})