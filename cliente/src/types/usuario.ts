import { email, nonEmpty, object, pipe, string } from "valibot";

export const LoginFormSchema = object({
    email: pipe(string(), nonEmpty("Indique su correo electrónico"), email("Correo inválido")),
    password : pipe(string(), nonEmpty("Indique su contraseña")),
})