import ClientesList from "./EliminarClientes";


const InventarioPagee = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <ClientesList />
      </div>
    </div>
  );
};

export default InventarioPagee;