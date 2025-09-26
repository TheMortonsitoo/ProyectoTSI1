import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const NavbarComponent = () => {
  const [logeado, setLogeado] = useState(() => !!localStorage.getItem("token"));
  const [mail, setEmail] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLogeado(false);
    setEmail("");
  }
    useEffect(() => {
      const AxiosUsuario = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const response = await axios.get("http://localhost:3000/api/clientes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEmail(response.data.email); 
        } catch (error) {
          console.error("Token invalido o expirado", error);
          handleLogout();
        }
      }
      AxiosUsuario();
    }, [logeado]);
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
                style={{ width: "25px", height: "25px", marginRight: "8px", backgroundColor: "white", borderRadius: "50%" }}
              />
              {mail}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/perfil">
                  Perfil
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to="/login" onClick={handleLogout}>
                  Cerrar Sesion
                  <button className="dropdown-item"  >
                    
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </ul>
        ) : ( 
        <ul className="nav justify-content-end"> {  /*Si no esta logeado tira esta*/}
          <li className="nav-item active">
            <NavLink to="/login" className="nav-link">
              <img
                src="public/Images/persona.png"
                alt="Registrarse"
                style={{ width: "25px", height: "25px", marginRight: "8px", backgroundColor: "white", borderRadius: "50%"  }}
              />             
            </NavLink>
          </li>
        </ul>
      )}
    </Navbar>
  );
};

export default NavbarComponent;
