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
    errors?: { [key: string]: string[] };
  };
  const [verContra, setVerContra] = useState(false);

  return (
    <div
      className="vh-50 vw-50 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url(/Images/paisajeE.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "24rem",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "10px",
        }}
      >
    <div className="container mt-4">
      <h2>Registro de Cliente</h2>

      {actionData?.error && (
        <div className="alert alert-danger">{actionData.error}</div>
      )}

      <Form method="POST">
          {/* RUT */}
          <div className="mb-3">
            <label>RUT</label>
            <input 
              name="rutCliente" 
              className={`form-control${actionData?.errors?.rutCliente ? " is-invalid" : ""}`} 
            />
            {actionData?.errors?.rutCliente && (
              <p className="text-danger small">{actionData.errors.rutCliente}</p>
            )}
          </div>

          {/* Nombre */}
          <div className="mb-3">
            <label>Nombre</label>
            <input 
              name="nombre" 
              className={`form-control${actionData?.errors?.nombre ? " is-invalid" : ""}`}  
            />
            {actionData?.errors?.nombre && (
              <p className="text-danger small">{actionData.errors.nombre}</p>
            )}
          </div>

          {/* Apellido Paterno */}
          <div className="mb-3">
            <label>Apellido Paterno</label>
            <input 
              name="apellidoPaterno" 
              className={`form-control${actionData?.errors?.apellidoPaterno ? " is-invalid" : ""}`} 
            />
            {actionData?.errors?.apellidoPaterno && (
              <p className="text-danger small">{actionData.errors.apellidoPaterno}</p>
            )}
          </div>

          {/* Apellido Materno */}
          <div className="mb-3">
            <label>Apellido Materno</label>
            <input 
              name="apellidoMaterno" 
              className={`form-control${actionData?.errors?.apellidoMaterno ? " is-invalid" : ""}`}  
            />
            {actionData?.errors?.apellidoMaterno && (
              <p className="text-danger small">{actionData.errors.apellidoMaterno}</p>
            )}
          </div>

          {/* Dirección */}
          <div className="mb-3">
            <label>Dirección</label>
            <input 
              name="direccion" 
              className={`form-control${actionData?.errors?.direccion ? " is-invalid" : ""}`}  
            />
            {actionData?.errors?.direccion && (
              <p className="text-danger small">{actionData.errors.direccion}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label>Teléfono</label>
            <input 
              name="fono" 
              className={`form-control${actionData?.errors?.fono ? " is-invalid" : ""}`}  
            />
            {actionData?.errors?.fono && (
              <p className="text-danger small">{actionData.errors.fono}</p>
            )}
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label>Correo</label>
            <input 
              type="email" 
              name="mail" 
              className={`form-control${actionData?.errors?.mail ? " is-invalid" : ""}`}  
            />
            {actionData?.errors?.mail && (
              <p className="text-danger small">{actionData.errors.mail[0]}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type={verContra ? "text" : "password"}
              name="contrasena"
              className={`form-control${actionData?.errors?.contrasena ? " is-invalid" : ""}`} 
            />
            {actionData?.errors?.contrasena && (
              <p className="text-danger small">{actionData.errors.contrasena[0]}</p>
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
    </div>
    </div>
  );
}
