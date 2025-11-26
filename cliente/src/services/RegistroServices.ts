export async function registrarUsuario(data: Record<string, any>) {
  try {
    const response = await fetch("http://localhost:3000/api/cliente/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resultado = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: resultado.error || "Error al registrar usuario",
      };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor" };
  }
}