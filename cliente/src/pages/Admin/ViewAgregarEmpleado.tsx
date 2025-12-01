import AgregarEmpleado from "./AgregarEmpleado";
import ListadoEmpleados from "./ListadoEmpleados";

const InventarioPage = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <AgregarEmpleado />
      </div>
      <div style={{ flex: 1 }}>
        <ListadoEmpleados />
      </div>
    </div>
  );
};

export default InventarioPage;