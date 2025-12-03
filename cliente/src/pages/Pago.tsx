import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

const PagoPage = () => {
  const [searchParams] = useSearchParams();
  const codVenta = searchParams.get("venta"); 
  const [data, setData] = useState<any>(null);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!codVenta || codVenta === "undefined") {
          console.warn("⚠️ codVenta inválido:", codVenta);
          return;
        }

        const url = `http://localhost:3000/api/ventas/${codVenta}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await res.json().catch(() => ({}));
        console.log("Respuesta fetch:", res.status, result);

        if (!res.ok) throw new Error(result.error || "No autorizado");

        setData(result.data || result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [codVenta, token]);

  const handleConfirmarPago = async () => {
    if (!data || !codVenta) {
      alert("⚠️ No hay venta válida para pagar.");
      return;
    }

    const payload = {
      codVenta,
      metodoPago,
      fecha: new Date().toISOString().slice(0, 10),
      montoPagado: data.total || 0
    };

    try {
      const res = await fetch("http://localhost:3000/api/pagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json().catch(() => ({}));
      console.log("Respuesta pago:", res.status, result);

      if (!res.ok) throw new Error(result.error || "Error al registrar pago");

      alert("✅ Pago registrado y operación finalizada");
      navigate("/");
    } catch (error) {
      console.error("Error al pagar:", error);
      alert("❌ No se pudo registrar el pago");
    }
  };

  const handleCancelarVenta = async () => {
    if (!codVenta) {
      alert("⚠️ No hay venta válida para cancelar.");
      return;
    }

    try {
      console.log("Cancelando venta con codVenta:", codVenta);

      const response = await fetch("http://localhost:3000/api/ventas/cancelar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ codVenta })
      });

      const result = await response.json().catch(() => ({}));
      console.log("Respuesta cancelar:", response.status, result);

      if (response.ok) {
        alert(" Venta cancelada correctamente");
        navigate("/");
      } else {
        alert(result.error || " Error al cancelar la venta");
      }
    } catch (error) {
      console.error("Error al cancelar venta:", error);
      alert(" Error interno al cancelar la venta");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Finalizar Pago</h2>

      {data ? (
        <>
          <p><strong>Venta:</strong> {codVenta}</p>
          <p><strong>Total:</strong> ${data.total}</p>

          <label>Método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            style={{ marginBottom: "15px", display: "block" }}
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="tarjeta">Tarjeta</option>
          </select>

          <Button variant="primary" className="me-2" onClick={handleConfirmarPago}>
            Confirmar y Finalizar
          </Button>

          <Button variant="danger" className="me-2" onClick={handleCancelarVenta}>
            Cancelar Venta
          </Button>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default PagoPage;
