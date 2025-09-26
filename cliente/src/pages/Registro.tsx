import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {

  const [verContra, setVerContra] = useState(false);
  const [datos, setDatos] = useState({
    rutCliente: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    direccion: "",
    fono: "",  
    mail: "",
    contrasena: ""
  })
  
  const ir = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDatos({...datos, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
          const response = await axios.post("http://localhost:3000/api/cliente/registrar", datos)
          if (response.status === 200) {
          console.log("Cuenta creada");
          alert("Cuenta creada correctamente");
          }
          ir("/login");
      }catch(error) {
          console.error("Error al registrar usuario:", error);
      }
  } 
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
        <h2 className="text-center fw-bold mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
            {/* rut */}
          <div className="mb-3">
            <label htmlFor="rut" className="form-label">
              Rut
            </label>
            <input
              type="text"
              className="form-control"
              id="rutCliente"
              placeholder="Ingrese rut"
              onChange={handleChange}
            />
          </div>

          {/* Nombres */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese Nombre"
              onChange={handleChange}
            />
          </div>
          {/* Apellidos P */}
          <div className="mb-3">
            <label htmlFor="apellidop" className="form-label">
              Apellido Paterno
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidoPaterno"
              placeholder="Ingrese apellido paterno"
              onChange={handleChange}
            />
          </div>

          {/* Apellidos M*/}
          <div className="mb-3">
            <label htmlFor="apellidom" className="form-label">
              Apellidos Materna
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidoMaterno"
              placeholder="Ingrese apellido materno"
              onChange={handleChange}
            />
          </div>
          {/* Direccion */}
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Direccion
            </label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              placeholder="Ingrese direccion"
              onChange={handleChange}
            />
          </div>
          {/* Telefono */}
          <div className="mb-3">
            <label htmlFor="fono" className="form-label">
              Ingrese Telefono
            </label>
            <input
              type="text"
              className="form-control"
              id="fono"
              placeholder="Ingrese telefono"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="mail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="mail"
              placeholder="example@gmail.com"
              onChange={handleChange}
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">
              Contraseña
            </label>
            <input
              type={verContra ? "text" : "password"}
              className="form-control"
              id="contrasena"
              placeholder="Ingrese contraseña"
              onChange={handleChange}
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
            Registrarse
          </button>
        </form>
        <div className = "mt-3 text-center">
            <span>Tienes cuenta registrada?</span>
            <a href="/login" className="text-decoration-none ms-2">
              Iniciar sesión
            </a>
        </div>
      </div>
    </div>
  )
}

export default Registro
