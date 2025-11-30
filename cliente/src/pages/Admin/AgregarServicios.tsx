import { useState } from "react";

const AgregarServicio = () => {
  const [form, setForm] = useState({
    nombreServicio: "",
    precio: "",
    descripcion: "",
    tiempo: "", // 👈 debe coincidir con el modelo
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          precio: Number(form.precio), // 👈 aseguramos que sea número
        }),
      });

      const data = await response.json();
      console.log("Servicio guardado:", data);

      if (data?.data?.codServicio) {
        alert(`Servicio agregado con éxito con código ${data.data.codServicio}`);
      } else {
        alert("Servicio agregado con éxito");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Servicio</h2>
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
          name="nombreServicio"
          placeholder="Nombre del servicio"
          value={form.nombreServicio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
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
          type="text"
          name="tiempo" // 👈 corregido para coincidir con el modelo
          placeholder="Tiempo (ej: 60 min)"
          value={form.tiempo}
          onChange={handleChange}
        />
        <button type="submit">Guardar servicio</button>
      </form>
    </div>
  );
};

export default AgregarServicio;
