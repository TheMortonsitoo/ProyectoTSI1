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
  const [mensajeGlobal, setMensajeGlobal] = useState<string>("");


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

      if (!response.ok) {
        if (data.error?.toLowerCase() === "el servicio ya está registrado") {
          setMensajeGlobal("Este servicio ya existe en el sistema.");
        } else {
          setMensajeGlobal(data.error || "Error interno al agregar el servicio.");
        }

        return; 
      }
      setMensajeGlobal("Se agregado el servicio correctamente.");

      setTimeout(() => window.location.reload(), 1200);

    } catch (error) {
      console.error("Error al guardar Servicio:", error);
      setMensajeGlobal("Error inesperado al intentar agregar el Servicio");
    }
  };

  return (
    <div>
      <h2>Agregar Servicio</h2>
      {mensajeGlobal && (
        <div
          className={`alert ${
            mensajeGlobal.includes("correctamente")
              ? "alert-success"
              : "alert-danger"
          }`}
          style={{ marginBottom: "20px" }}
        >
          {mensajeGlobal}
        </div>
      )}
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
          className={`form-control${errores?.nombreServicio ? " is-invalid" : ""}`}
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
          className={`form-control${errores?.precio ? " is-invalid" : ""}`}
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
          className={`form-control${errores?.descripcion ? " is-invalid" : ""}`}
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
          className={`form-control${errores?.tiempo ? " is-invalid" : ""}`}
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
