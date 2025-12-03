import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Col, Modal, Row, Table } from "react-bootstrap";

interface DetalleServicio {
  codServicio: string;
  nombreServicio: string | null;
  descripcionDetalle: string;
  observaciones: string;
  precioUnitario: number;
  subtotal: number;
}

interface ProductoOrden {
  codProducto: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface Orden {
  codVenta: string;
  fecha: string;
  rutCliente: string;
  total: number;
  estadoVenta: string;
  servicios?: DetalleServicio[];
  productos?: ProductoOrden[];
}

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [vista, setVista] = useState<"dashboard">("dashboard");
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const token = localStorage.getItem("token");

  // ================== Cargar órdenes ======================
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/mis-ordenes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Órdenes cargadas:", data);

        if (Array.isArray(data.data)) {
          setOrdenes(data.data);
        } else {
          setOrdenes([]);
        }
      } catch (error) {
        console.error("Error cargando órdenes:", error);
      }
    };

    if (token) fetchOrdenes();
  }, [token]);

  // ================== Dashboard Stats =====================
  const stats = useMemo(() => {
  const totalOrdenes = ordenes.length;
  const totalGastado = ordenes.reduce((acc, o) => acc + (o.total ?? 0), 0);

  // Contadores
  const serviciosCount: Record<string, number> = {};
  const productosCount: Record<string, number> = {};

  ordenes.forEach((o) => {
    // Contar servicios
    o.servicios?.forEach((s) => {
      const key = s.descripcionDetalle || s.codServicio || "Servicio";
      serviciosCount[key] = (serviciosCount[key] || 0) + 1;
    });

    // Contar productos
    o.productos?.forEach((p) => {
      const key = p.nombre || `Producto ${p.codProducto}`;
      productosCount[key] = (productosCount[key] || 0) + p.cantidad;
    });
  });

  // Servicio más frecuente
  const topServicio =
    Object.entries(serviciosCount).sort((a, b) => b[1] - a[1])[0] || null;

  // Producto más frecuente
  const topProducto =
    Object.entries(productosCount).sort((a, b) => b[1] - a[1])[0] || null;

  let destacadoNombre = "-";
  let destacadoVeces = 0;

  if (topServicio) {
    destacadoNombre = topServicio[0];
    destacadoVeces = topServicio[1];
  } else if (topProducto) {
    destacadoNombre = topProducto[0];
    destacadoVeces = topProducto[1];
  }

  return {
    totalOrdenes,
    totalGastado,
    destacadoNombre,
    destacadoVeces,
  };
}, [ordenes]);


  // ================== Modal ======================
  const abrirDetalle = (orden: Orden) => {
    setOrdenSeleccionada(orden);
    setMostrarModal(true);
  };

  const cerrarDetalle = () => {
    setMostrarModal(false);
    setOrdenSeleccionada(null);
  };

  // ================== Helpers ======================
  const formatearFecha = (fecha: string) => {
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return fecha;
    return d.toLocaleDateString();
  };

  const badgeEstado = (estado: string) => {
    const est = estado?.toLowerCase() || "";
    if (est.includes("pend")) return <Badge bg="warning">Pendiente</Badge>;
    if (est.includes("final")) return <Badge bg="success">Finalizada</Badge>;
    if (est.includes("anul")) return <Badge bg="danger">Anulada</Badge>;
    return <Badge bg="secondary">{estado}</Badge>;
  };

  // ==========================================================
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Mis Órdenes de Compra</h3>
      </div>

      {/* ===================== DASHBOARD ===================== */}
      {vista === "dashboard" && (
        <>
          <Row className="mb-3 g-3">
            <Col md={4}>
              <Card><Card.Body>
                <Card.Title>Total órdenes</Card.Title>
                <h3>{stats.totalOrdenes}</h3>
              </Card.Body></Card>
            </Col>
            <Col md={4}>
              <Card><Card.Body>
                <Card.Title>Total gastado</Card.Title>
                <h3>${stats.totalGastado.toLocaleString()}</h3>
              </Card.Body></Card>
            </Col>
            <Col md={4}>
              <Card><Card.Body>
                <Card.Title>Servicio / Producto más frecuente</Card.Title>
                <Card.Text style={{ fontSize: "1rem" }}>
                  {stats.destacadoNombre}
                  {stats.destacadoNombre !== "-" && (
                    <>
                      <br />
                      <small>Usado {stats.destacadoVeces} veces</small>
                    </>
                  )}
                </Card.Text>

              </Card.Body></Card>
            </Col>
          </Row>

          <h5>Detalle resumido</h5>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Código</th>
                <th>Fecha</th>
                <th>Servicios</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.codVenta}>
                  <td>{o.codVenta}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>
                    { o.servicios?.length
                      ? o.servicios.map((s) => s.nombreServicio || s.descripcionDetalle).join(", ")
                      : "-" 
                    }

                  </td>
                  <td>
                    {o.productos?.length
                      ? o.productos.map((p) => `${p.nombre} x${p.cantidad}`).join(", ")
                      : "-"}
                  </td>
                  <td>${(o.total ?? 0).toLocaleString()}</td>
                  <td>
                    <Button size="sm" variant="outline-secondary" onClick={() => abrirDetalle(o)}>
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* ===================== MODAL DETALLE ===================== */}
      <Modal show={mostrarModal} onHide={cerrarDetalle} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de orden</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {ordenSeleccionada && (
            <>
              <p>
                <strong>Código:</strong> {ordenSeleccionada.codVenta}
                <br />
                <strong>Fecha:</strong> {formatearFecha(ordenSeleccionada.fecha)}
                <br />
                <strong>Estado:</strong> {badgeEstado(ordenSeleccionada.estadoVenta)}
              </p>

              {/* ---- SERVICIOS ---- */}
              <h6>Servicios</h6>
              {ordenSeleccionada.servicios?.length ? (
                <Table size="sm" bordered>
                  <thead>
                    <tr>
                      <th>Servicio</th>
                      <th>Obs.</th>
                      <th>Unit.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenSeleccionada.servicios.map((s, i) => (
                      <tr key={i}>
                        <td>{s.nombreServicio || s.codServicio}</td>
                        <td>{s.observaciones || "-"}</td>
                        <td>${s.precioUnitario.toLocaleString()}</td>
                        <td>${s.subtotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No hay servicios asociados.</p>
              )}

              {/* ---- PRODUCTOS ---- */}
              <h6 className="mt-3">Productos</h6>
              {ordenSeleccionada.productos?.length ? (
                <Table size="sm" bordered>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Unit.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenSeleccionada.productos.map((p, i) => (
                      <tr key={i}>
                        <td>{p.nombre}</td>
                        <td>{p.cantidad}</td>
                        <td>${p.precioUnitario.toLocaleString()}</td>
                        <td>${p.subtotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No hay productos asociados.</p>
              )}

              <p className="text-end">
                <strong>Total:</strong>{" "}
                ${(ordenSeleccionada.total ?? 0).toLocaleString()}
              </p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarDetalle}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdenesCompra;