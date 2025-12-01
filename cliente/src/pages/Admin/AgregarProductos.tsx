import { useState } from "react";
import { safeParse } from "valibot";
import { ProductoSchema } from "../../schemas/registroProductoSchema";

const AgregarProducto = () => {
  const [form, setForm] = useState({
    nombreProducto: "",
    precioUnitario: "",
    descripcion: "",
    stock: "",
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
    const validacion = safeParse(ProductoSchema, form);

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
    setErrores({}); // limpiar errores si todo está OK
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Producto guardado:", data);

      // Si el producto ya existe 
      if (!response.ok) {
        if (data.error === "El producto ya está registrado") {
          setMensajeGlobal("Este producto ya existe en el sistema.");
        } else {
          setMensajeGlobal("Error interno al agregar el producto.");
        }
        return; 
      }

      // Si todo salió bien 
      if (data?.data?.codProducto) {
        alert(`Producto agregado con éxito con código ${data.data.codProducto}`);
      } else {
        alert("Producto agregado con éxito");
      }

      window.location.reload();

    } catch (error) {
      console.error("Error al guardar producto:", error);
      setMensajeGlobal("Error inesperado al intentar agregar el producto");
    }

  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      {mensajeGlobal && (
        <div className="alert alert-danger mb-3">{mensajeGlobal}</div>
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
        {/* Nombre */}
        <input
          type="text"
          name="nombreProducto"
          placeholder="Nombre"
          value={form.nombreProducto}
          onChange={handleChange}
        />
        {errores.nombreProducto && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.nombreProducto}
          </p>
        )}

        {/* Precio */}
        <input
          type="number"
          name="precioUnitario"
          placeholder="Precio"
          value={form.precioUnitario}
          onChange={handleChange}
        />
        {errores.precioUnitario && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.precioUnitario}
          </p>
        )}

        {/* Descripción */}
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

        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        {errores.stock && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-8px" }}>
            {errores.stock}
          </p>
        )}

        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
