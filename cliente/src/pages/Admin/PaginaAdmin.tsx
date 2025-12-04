import { useNavigate } from "react-router-dom";

const AdminPanel = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Solo accesible para usuarios con rol admin.</p>

      <button onClick={() => navigate('/agregar-producto')}>Agregar producto</button>

      <button onClick={() => navigate('/agregar-servicio')}>Agregar servicio</button>

      <button onClick={() => navigate('/agregar-empleado')}>Agregar empleado</button>

      <button onClick={() => navigate('/eliminar-cliente')}>Eliminar Cliente</button>
    </div> 
  );
};

export default AdminPanel;
