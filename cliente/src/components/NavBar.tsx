import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const API = "http://localhost:3000/api";

const NavbarComponent = () => {
  const [logeado, setLogeado] = useState<boolean>(() => !!localStorage.getItem("token"));
  const [mail, setEmail] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    localStorage.removeItem("rut");
    setLogeado(false);
    setEmail("");
  };

  useEffect(() => {
    const cargarUsuario = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol")?.toLowerCase();

      if (!token || !rol) return;

      const endpoint =
        rol === "admin"
          ? `${API}/empleados/perfil`
          : `${API}/clientes/perfil`;

      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const correo = response.data?.mail ?? response.data?.email ?? "";
        setEmail(correo);
        setLogeado(true);
      } catch (error: any) {
        const status = error?.response?.status;
        if (status === 401) {
          handleLogout();
        }
      }
    };

    cargarUsuario();
    const onStorage = () => setLogeado(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Reload Motors</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to={logeado ? "/tienda" : "/login"}>Tienda</Nav.Link>
            <Nav.Link as={ScrollLink} to="contacto" smooth={true} duration={50}>Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {logeado ? (
        <ul className="nav justify-content-end">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="public/Images/persona.png"
                alt="Cuenta"
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "8px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              />
              {mail || "Mi cuenta"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <NavLink className="dropdown-item" to="/perfil">Perfil</NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/login" onClick={handleLogout}>
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </ul>
      ) : (
        <ul className="nav justify-content-end">
          <li className="nav-item active">
            <NavLink to="/login" className="nav-link">
              <img
                src="public/Images/persona.png"
                alt="Registrarse"
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "8px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
          </li>
        </ul>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
