const Unauthorized = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Acceso Denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <a href="/" className="btn btn-primary mt-3">Volver al inicio</a>
    </div>
  );
};

export default Unauthorized;
