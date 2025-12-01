import { useState } from "react";
import { ServicioSchema } from "../../schemas/registroServicioSchema";
import { safeParse } from "valibot";

const AgregarServicio = () => {
  const [form, setForm] = useState({
    nombreServicio: "",
    precio: "",
    descripcion: "",
    tiempo: "", 
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Limpia error en tiempo real si empieza a escribir
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación con Valibot
    const validacion = safeParse(ServicioSchema, form);

    if (!validacion.success) {
        const newErrors: Record<string, string> = {};

        validacion.issues.forEach((issue) => {
            const field = issue.path?.map(p => p.key).join(".") as string;

            if (field) {
            newErrors[field] = issue.message;
            }
        });

        setErrores(newErrors);
        return;
        }

    setErrores({});
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
        />
        {errores.nombreServicio && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.nombreServicio}
          </p>
        )}
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          
        />
        {errores.precio && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.precio}
          </p>
        )}
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />
        {errores.descripcion && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.descripcion}
          </p>
        )}
        <input
          type="text"
          name="tiempo" 
          placeholder="Tiempo (ej: 60 min)"
          value={form.tiempo}
          onChange={handleChange}
        />
        {errores.tiempo && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.tiempo}
          </p>
        )}
        <button type="submit">Guardar servicio</button>
      </form>
    </div>
  );
};

export default AgregarServicio;
