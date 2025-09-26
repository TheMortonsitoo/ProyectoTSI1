import { Form, Button } from "react-bootstrap";
import { Element } from 'react-scroll';


const ContactForm = () => {
  return (
    <>
    <Element className="text-center" name="contacto" >
      <h1>📞 Contáctanos</h1>
      <div className="container mt-4 mb-5 background-light p-4 rounded " >
        <Form className="mx-auto" style={{ maxWidth: "400px" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre"  />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Button variant="primary" type="submit">Enviar</Button>
        </Form>
      </div>
    </Element>
    
    </>
  );
};

export default ContactForm;
