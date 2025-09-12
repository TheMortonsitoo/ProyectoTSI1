import { Form, Button } from "react-bootstrap";

const ContactForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nombre" />
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
  );
};

export default ContactForm;
