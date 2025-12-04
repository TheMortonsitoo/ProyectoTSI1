import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Servicio {
  codServicio: string;
  nombreServicio: string;
  precio: number;
  tiempo: string;
}

interface Empleado {
  rutEmpleado: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  rol: string; 
}
interface Ocupado {
  hora: string;
  rutEmpleado: string;
}

const Agendar = () => {
  const navigate = useNavigate();
  //-----------------------------------------------------
  const [date, setDate] = useState(new Date());
  const [hora, setHora] = useState("");
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [empleadoRut, setEmpleadoRut] = useState("");
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [clienteRut, setClienteRut] = useState("");
  const [ocupados, setOcupados] = useState<Ocupado[]>([]);
  const [vehiculos, setVehiculos] = useState<any[]>([]);
  const [observaciones_cliente, setObservacionesCliente] = useState("");
  const horasDisponibles = ["09:00","10:00","11:00","12:00","15:00","16:00","17:00"];
  //-----------------------------------------------------
  const cargarVehiculos = async () => {
  try {
    const token = localStorage.getItem("token");
    const rut = localStorage.getItem("rut");

    if (!token || !rut) return;

    const res = await axios.get(
      `http://localhost:3000/api/vehiculosjiji/cliente/${rut}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setVehiculos(res.data.data || res.data);
  } catch (error) {
    console.error("Error cargando vehículos:", error);
  }
};

  useEffect(() => {
  cargarVehiculos();
  }, []);

  //-----------------------------------------------------
  // Obtener RUT del cliente desde localStorage o sesión
  useEffect(() => {
    const rut = localStorage.getItem("rut");
    if (rut) {
      setClienteRut(rut);
    }
  }, []);
  //-----------------------------------------------------

  //-----------------------------------------------------

  // Cargar horas ocupadas para la fecha seleccionada
useEffect(() => {
  const fechaSeleccionada = date.toISOString().split("T")[0];
  const token = localStorage.getItem("token");

  axios.get("http://localhost:3000/api/calendario/ocupados", {
    params: { fecha: fechaSeleccionada },
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((res) => setOcupados(res.data.data)) 
  .catch((err) => console.error("Error cargando ocupados:", err));
}, [date, empleadoRut]);


  const horasFiltradas = horasDisponibles.filter((h) => {
    // Si existe un registro ocupado con la misma hora y el mismo mecánico → bloquear la hora
    const ocupado = ocupados.find(
      (o) => o.hora === h && o.rutEmpleado === empleadoRut
    );

    return !ocupado;
  });

  //-----------------------------------------------------
  // Cargar servicios
  useEffect(() => {
    axios.get("http://localhost:3000/api/servicios")
      .then((res) => {
        console.log("Servicios cargados:", res.data);
        const data = res.data.data;
        setServicios(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);
  //-----------------------------------------------------

  //-----------------------------------------------------
  // Cargar empleados
  useEffect(() => {
    axios.get("http://localhost:3000/api/empleados")
      .then((res) => {
        console.log("Empleados cargados:", res.data);
        const data = res.data.data;
        setEmpleados(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error cargando empleados:", err));
  }, []);
  //-----------------------------------------------------

  //-----------------------------------------------------
  const handleAgregarVehiculo = async () => {
    if (!patente || !marca || !modelo || !anio) {
      alert("⚠️ Debes rellenar todos los campos del vehículo.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const rutCliente = localStorage.getItem("rut");

      await axios.post(
        "http://localhost:3000/api/vehiculosjiji",
        {
          patente,
          marca,
          modelo,
          anio,
          rutCliente 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert(" ✅ Vehículo agregado correctamente.");
      await cargarVehiculos();
      
      // limpiar campos
      setPatente("");
      setMarca("");
      setModelo("");
      setAnio("");

    } catch (error) {
        console.error("Error al guardar vehículo:", error);
        alert(" No se pudo guardar el vehículo.");
      }
  }
  // Agendar servicio
 const handleAgendar = async () => {
  if (!servicioSeleccionado || !hora || !empleadoRut || !patente) {
    alert("Debes rellenar todos los campos.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión.");
      return;
    }

    const servicio = servicios.find(s => s.codServicio === servicioSeleccionado);
    const fechaFormateada = date.toISOString().split("T")[0];

    const res = await axios.post(
      "http://localhost:3000/api/calendario/agendar",
      {
        rutCliente: clienteRut,
        rutEmpleado: empleadoRut,
        patente,
        fecha: fechaFormateada,
        hora,
        codServicio: servicioSeleccionado,
        descripcion: servicio?.nombreServicio || "",
        observaciones_cliente: observaciones_cliente.trim() || "",
        precio_unitario: servicio?.precio || 0
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const result = res.data;
    alert(` Agendaste el ${date.toLocaleDateString()} a las ${hora}`);

    // limpiar observaciones
    setObservacionesCliente("");

    // Redirigir a PagoPage con el codAgenda
   const codVenta = result.data?.codVenta;
    if (codVenta) {
      navigate(`/pago?venta=${codVenta}`); //  redirige con venta
    }

  } catch (error) {
    console.error("Error al agendar:", error);
    alert(" Error al agendar servicio.");
  }
};



useEffect(() => {
  const rut = localStorage.getItem("rut");
  const token = localStorage.getItem("token");
  if (rut && token) {
    axios.get(`http://localhost:3000/api/vehiculosjiji/cliente/${rut}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const data = res.data.data;
      setVehiculos(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error("Error cargando vehículos:", err));
  }
}, []);

  return (
    <Container fluid className="my-5">
      <Row>
        {/* Columna izquierda con info */}
        <Col md={6} className="text-white d-flex flex-column justify-content-center p-5"
          style={{
            backgroundImage: "url('/images/TallerMoto.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px"
          }}
        >
          <div style={{ backgroundColor: "rgba(0,0,0,0.6)", padding: "30px" }}>
            <h2 className="fw-bold mb-4">¿CÓMO AGENDAR?</h2>
            <p>
              Para brindarle una atención personalizada y valorando su tiempo,
              hemos implementado un sistema de agendamiento de servicios.
              Sigue estos tres simples pasos para reservar tu cita:
            </p>

            <h4 className="fw-bold mt-4">PASO 1</h4>
            <p>Rellenar los datos del vehiculo.</p>

            <h4 className="fw-bold">PASO 2</h4>
            <p>Seleccionar el tipo de servicios que se brindara, el mecanico que mas te guste, escoger el día y la hora que más te acomoda.</p>

            <h4 className="fw-bold">PASO 3</h4>
            <p>
              Al final el agendamiento te enviaremos un
              correo confirmando tu cita.
            </p>
          </div>

        </Col>

        {/* Columna derecha con formulario */}
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center p-5">
          {/* agregar auto */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: ABCD12"
                  value={patente}
                  onChange={(e) => setPatente(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Toyota"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Corolla"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Año</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 2020"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="dark"
            className="px-4 py-2 rounded-pill shadow-lg mt-4"
            onClick={handleAgregarVehiculo}
          >
            Agregar Vehiculo
          </Button>

          <br />

          {/* Calendario */}
          <Calendar
            onChange={(value) => value instanceof Date && setDate(value)}
            tileDisabled={({ date, view }) =>
              view === "month" && date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            value={date}
          />

          {/* Select servicio */}
          <Form.Group className="mt-2 w-100">
            <Form.Label className="fw-semibold">Tipo de servicio</Form.Label>

            <Form.Select
              value={servicioSeleccionado}
              onChange={(e) => setServicioSeleccionado(e.target.value)}
              className="shadow-sm"
            >
              <option value="">Selecciona un servicio</option>
              {servicios.map((s) => (
                <option key={s.codServicio} value={s.codServicio}>
                  {s.nombreServicio} - ${s.precio} ({s.tiempo})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Select empleado */}
          <Form.Group className="mt-2 w-100">
            <Form.Label className="fw-semibold">Seleccione Empleado</Form.Label>
            <Form.Select
              className="mt-1"
              value={empleadoRut}
              onChange={(e) => setEmpleadoRut(e.target.value)}
            >
            <option value="">Selecciona un mecánico</option>
              {empleados.filter((emp) => emp.rol === "empleado").map((emp) => (
                <option key={emp.rutEmpleado} value={emp.rutEmpleado}>
                  {emp.nombres} {emp.apellido_paterno} {emp.apellido_materno}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Select hora */}
          <Form.Group className="mt-2 w-100">
            <Form.Label className="fw-semibold">Seleccione una Hora</Form.Label>
            <Form.Select
              className="mt-1"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              >
              <option value="">Selecciona una hora</option>
              {horasFiltradas.length === 0 && (
                <option disabled>No hay horas disponibles</option>
              )}
              {horasFiltradas.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </Form.Select>
          </Form.Group>

          
          {/* Select vehículo */}
          <Form.Group className="mt-2 w-100">
            <Form.Label className="fw-semibold">Seleccione el vehiculo</Form.Label>
            <Form.Select
              className="mt-1"
              value={patente}
              onChange={(e) => setPatente(e.target.value)}
            >
              <option value="">Selecciona tu vehículo</option>
              {vehiculos.map((v) => (
                <option key={v.patente} value={v.patente}>
                  {v.patente} - {v.marca} {v.modelo} ({v.anio})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Obervaciones */}
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe observaciones del cliente..."
            value={observaciones_cliente}
            onChange={(e) => setObservacionesCliente(e.target.value)}
          />


          {/* Botón */}
          <Button
            variant="danger"
            className="px-4 py-2 rounded-pill shadow-lg mt-4"
            onClick={handleAgendar}
          >
            <i className="bi bi-calendar-check me-2"></i>
            AGENDAR SERVICIO
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Agendar;