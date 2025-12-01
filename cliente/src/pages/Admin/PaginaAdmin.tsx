import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AdminPanel = () => {

  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const sincronizarAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token usado:", token);

      const response = await axios.post(
        "http://localhost:3000/api/sincronizar-admins",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje(response.data.mensaje);
    } catch (error: any) {
      console.error("Error al sincronizar:", error);
      setMensaje(error.response?.data?.mensaje || error.message);
    }
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Solo accesible para usuarios con rol admin.</p>


      {mensaje && <p>{mensaje}</p>}

      <button onClick={() => navigate('/agregar-producto')}>Agregar producto</button>

      <button onClick={() => navigate('/agregar-servicio')}>Agregar servicio</button>

      <button onClick={() => navigate('/agregar-empleado')}>Agregar empleado</button>
    </div> 
  );
};

export default AdminPanel;
