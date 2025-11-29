import { safeParse } from "valibot";
import { LoginFormSchema } from "../schemas/loginSchema";

export async function login(formData: Record<string, any>) {
  try {
    // 1️⃣ VALIDAR DATOS DEL FORM CON VALIBOT
    const resultado = safeParse(LoginFormSchema, formData);

    if (!resultado.success) {
      // Construcción de errores del schema
      const detalleErrores: Record<string, string[]> = {};

      for (const issue of resultado.issues) {
        const rawCampo = issue.path?.[0]?.key;
        const campo: string = typeof rawCampo === "string" ? rawCampo : "form";



        if (!detalleErrores[campo]) {
          detalleErrores[campo] = [];
        }

        detalleErrores[campo].push(issue.message);
      }

      return {
        success: false,
        error: "Datos del formulario no válidos",
        detalleErrores,
      };
    }

    // 2️⃣ LLAMAR AL BACKEND
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("Respuesta login:", data);

    // Respuesta del backend con error
    if (!data.success) {
      return {
        success: false,
        error: data.error ?? "Error en servidor",
        detalleErrores: data.detalleErrores ?? null,
      };
    }

    // 3️⃣ GUARDAR EN LOCAL STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.user.rol);
    localStorage.setItem("rut", data.user.rut);
    window.dispatchEvent(new Event("storage"));
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Error inesperado",
    };
  }
}
