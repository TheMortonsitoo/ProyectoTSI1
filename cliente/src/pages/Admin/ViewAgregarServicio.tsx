
import AgregarServicio from "./AgregarServicios";
import ServiciosList from "./ListadoServicios";

const InventarioPage = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <AgregarServicio />
      </div>
      <div style={{ flex: 1 }}>
        <ServiciosList />
      </div>
    </div>
  );
};

export default InventarioPage;
