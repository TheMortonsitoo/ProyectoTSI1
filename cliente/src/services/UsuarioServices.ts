export async function login(formData: Record<string, any>) {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!data.success) {
        return { success: false, error: data.error };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.user.rol);

    return { success: true };
}