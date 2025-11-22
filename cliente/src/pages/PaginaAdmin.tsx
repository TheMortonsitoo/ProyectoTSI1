import { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
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

      <button onClick={sincronizarAdmins}>🔄 Sincronizar Admins</button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AdminPanel;
