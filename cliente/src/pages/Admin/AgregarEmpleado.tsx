import { useState } from "react";
import { safeParse } from "valibot";
import { empleadoSchema } from "../../schemas/registroEmpleadoSchema";

const AgregarEmpleado = () => {
  const [form, setForm] = useState({
    rutEmpleado: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fono: "",
    mail: "",
    contrasena: "",
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación con Valibot
    const validacion = safeParse(empleadoSchema, form);

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


    // Si no hay errores, limpiar mensajes
    setErrores({});

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          rol: "empleado", // Se asigna automáticamente
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrar empleado");
        return;
      }

      alert("Empleado registrado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
      alert("Error inesperado");
    }
  };

    return (
    <div>
        <h2>Agregar Empleado</h2>
        <form
        onSubmit={handleSubmit}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
        }}
        >
        <input
            type="text"
            name="rutEmpleado"
            placeholder="RUT"
            value={form.rutEmpleado}
            onChange={handleChange}
        />
        {errores.rutEmpleado && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.rutEmpleado}
            </p>
        )}

        <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={form.nombres}
            onChange={handleChange}
        />
        {errores.nombres && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.nombres}
            </p>
        )}

        <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido paterno"
            value={form.apellidoPaterno}
            onChange={handleChange}
        />
        {errores.apellidoPaterno && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.apellidoPaterno}
            </p>
        )}

        <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido materno"
            value={form.apellidoMaterno}
            onChange={handleChange}
        />
        {errores.apellidoMaterno && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.apellidoMaterno}
            </p>
        )}

        <input
            type="text"
            name="fono"
            placeholder="Teléfono"
            value={form.fono}
            onChange={handleChange}
        />
        {errores.fono && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.fono}
            </p>
        )}

        <input
            type="email"
            name="mail"
            placeholder="Correo"
            value={form.mail}
            onChange={handleChange}
        />
        {errores.mail && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.mail}
            </p>
        )}

        <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={handleChange}
        />
        {errores.contrasena && (
            <p style={{ color: "#d10000", fontSize: "12px", marginTop: "-6px", marginBottom: "4px" }}>
            {errores.contrasena}
            </p>
        )}

        <button type="submit">Registrar empleado</button>
        </form>
    </div>
    );

};

export default AgregarEmpleado;
