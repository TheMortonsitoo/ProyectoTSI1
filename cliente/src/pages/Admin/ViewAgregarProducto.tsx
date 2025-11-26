import AgregarProducto from "./AgregarProductos";
import ProductosList from "./ListadoProductos";

const InventarioPage = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <AgregarProducto />
      </div>
      <div style={{ flex: 1 }}>
        <ProductosList />
      </div>
    </div>
  );
};

export default InventarioPage;
