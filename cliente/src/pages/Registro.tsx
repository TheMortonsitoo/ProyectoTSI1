import { Form, useActionData, redirect, type ActionFunctionArgs } from "react-router-dom";
import { registrarUsuario } from "../services/RegistroServices";
import { flatten, safeParse } from "valibot";
import { RegistroSchema } from "../schemas/registroSchema";
import { useState } from "react";

export async function actionRegistro({ request }: ActionFunctionArgs) {
  const form = Object.fromEntries(await request.formData());

  // Validación Valibot
  const resultado = safeParse(RegistroSchema, form);

  if (!resultado.success) {
    return {
      success: false,
      errors: flatten(resultado.issues).nested
    };
  }

  // Llamar al backend
  const res = await registrarUsuario(form);

  if (!res.success) {
    return res;
  }

  return redirect("/login");
}

export default function Registro() {
  const actionData = useActionData() as {
    success?: boolean;
    error?: string;
    errors?: Record<string, string[]>;
  };
  const [verContra, setVerContra] = useState(false);

  return (
    <div className="container mt-4">
      <h2>Registro de Cliente</h2>

      {actionData?.error && (
        <div className="alert alert-danger">{actionData.error}</div>
      )}

      <Form method="POST">

          {/* RUT */}
          <div className="mb-3">
            <label>RUT</label>
            <input name="rutCliente" className="form-control" />
            {actionData?.errors?.rutCliente && (
              <p className="text-danger small">{actionData.errors.rutCliente}</p>
            )}
          </div>

          {/* Nombre */}
          <div className="mb-3">
            <label>Nombre</label>
            <input name="nombre" className="form-control" />
            {actionData?.errors?.nombre && (
              <p className="text-danger small">{actionData.errors.nombre}</p>
            )}
          </div>

          {/* Apellido Paterno */}
          <div className="mb-3">
            <label>Apellido Paterno</label>
            <input name="apellidoPaterno" className="form-control" />
            {actionData?.errors?.apellidoPaterno && (
              <p className="text-danger small">{actionData.errors.apellidoPaterno}</p>
            )}
          </div>

          {/* Apellido Materno */}
          <div className="mb-3">
            <label>Apellido Materno</label>
            <input name="apellidoMaterno" className="form-control" />
            {actionData?.errors?.apellidoMaterno && (
              <p className="text-danger small">{actionData.errors.apellidoMaterno}</p>
            )}
          </div>

          {/* Dirección */}
          <div className="mb-3">
            <label>Dirección</label>
            <input name="direccion" className="form-control" />
            {actionData?.errors?.direccion && (
              <p className="text-danger small">{actionData.errors.direccion}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label>Teléfono</label>
            <input name="fono" className="form-control" />
            {actionData?.errors?.fono && (
              <p className="text-danger small">{actionData.errors.fono}</p>
            )}
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label>Correo</label>
            <input type="email" name="mail" className="form-control" />
            {actionData?.errors?.mail && (
              <p className="text-danger small">{actionData.errors.mail}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type={verContra ? "text" : "password"}
              name="contrasena"
              className="form-control"
            />
            {actionData?.errors?.contrasena && (
              <p className="text-danger small">{actionData.errors.contrasena}</p>
            )}
          </div>

          {/* Mostrar contraseña */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              checked={verContra}
              className="form-check-input"
              onChange={(e) => setVerContra(e.target.checked)}
            />
            <label className="form-check-label">Mostrar contraseña</label>
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </Form>
         <div className="mt-3 text-center">
          <span>¿Ya tienes cuenta?</span>
          <a href="/login" className="ms-2">Inicia sesión</a>
        </div>
    </div>
  );
}
