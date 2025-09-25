import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Reload Motors</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/tienda">Tienda</Nav.Link>
            <Nav.Link as={ScrollLink} to="contacto" smooth={true} duration={50}>Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ul className="nav justify-content-end"> {  /*Si no esta logeado tira esta*/}
              <li className="nav-item active">
                <NavLink to="/registrar" className="nav-link">
                  <img
                    src="/Images/persona.jpg"
                    alt="Registrarse"
                    style={{ width: "20px", height: "20px", marginRight: "8px" }}
                  />
                  
                </NavLink>
              </li>
            </ul>
    </Navbar>
  );
};

export default NavbarComponent;
