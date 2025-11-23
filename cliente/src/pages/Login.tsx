import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mail, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");
  const [verContra, setVerContra] = useState(false);
  const ir = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        mail,
        contrasena,
      });

      if (response.status === 200) {
        // Guardar datos en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", mail);
        localStorage.setItem("rol", response.data.usuario.rol.toLowerCase());

        console.log("Rol recibido del backend:", response.data.usuario.rol);
        console.log("Rol guardado en localStorage:", localStorage.getItem("rol"));

        // Redirigir al home sin recargar la página
        ir("/");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

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
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              value={mail}
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type={verContra ? "text" : "password"}
              value={contrasena}
              className="form-control"
              id="password"
              placeholder="Ingrese Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Mostrar contraseña */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={verContra}
              onChange={(e) => setVerContra(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Mostrar contraseña
            </label>
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
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

export default Login;
