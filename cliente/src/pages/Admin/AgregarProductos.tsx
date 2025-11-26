import { useState } from "react";

const AgregarProducto = () => {
  const [form, setForm] = useState({
    nombreProducto: "",
    precioUnitario: "",
    descripcion: "",
    stock: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token"); // recuperar token
    const response = await fetch("http://localhost:3000/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // enviar token
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log("Producto guardado:", data);

    if (data?.data?.codProducto) {
      alert(`Producto agregado con éxito con código ${data.data.codProducto}`);
    } else {
      alert("Producto agregado con éxito");

      
    }
    window.location.reload(); // recargar la página para actualizar el listado
  } catch (error) {
    console.error("Error al guardar producto:", error);
  }
};



  return (
    <div>
      <h2>Agregar Producto</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "300px",
        }}
      >
        <input
          type="text"
          name="nombreProducto"
          placeholder="Nombre"
          value={form.nombreProducto}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precioUnitario"
          placeholder="Precio"
          value={form.precioUnitario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
