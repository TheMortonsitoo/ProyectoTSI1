import { Form, redirect, useActionData, useSearchParams, type ActionFunctionArgs } from "react-router-dom";
import { login } from "../services/UsuarioServices";

export async function action({ request}: ActionFunctionArgs){
  const formData = Object.fromEntries(await request.formData())
  const resultado = await login(formData)
  if(resultado.success){
    return redirect("/");
    
  }
  return resultado
  
}

export default function Login() {
  const actionData = useActionData() as {
  success?: boolean;
  error?: string;
  detalleErrores?: { [key: string]: string[] };
};
  const [params] = useSearchParams();
  const success = params.get("success");
  return (
    <div
      className="vh-80 vw-60 d-flex justify-content-center align-items-center"
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
        <h2 className="text-center fw-bold mb-4">Iniciar Sesión</h2>
        {success && (
          <div className="alert alert-success mb-3">
            Cuenta creada correctamente.
          </div>
        )}
        {actionData?.error && <div className = "alert alert-danger"> {actionData.error} </div>}
        <Form method="POST">
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              name="mail"
              className={`form-control${actionData?.detalleErrores?.mail ? " is-invalid" : ""}`}
              id="email"
              placeholder="example@gmail.com"
            />
            {actionData?.detalleErrores?.mail && (
              <p className="text-danger small">{actionData.detalleErrores.mail}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              className={`form-control${actionData?.detalleErrores?.contrasena ? " is-invalid" : ""}`}
              id="password"
              placeholder="Ingrese Contraseña"
            />
            {actionData?.detalleErrores?.contrasena && (
              <p className="text-danger small">{actionData.detalleErrores.contrasena}</p>
            )}
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </Form>
        <div className="mt-3 text-center">
          <span>No tiene cuenta?</span>
          <a href="/registrar" className="text-decoration-none ms-2">
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
};
