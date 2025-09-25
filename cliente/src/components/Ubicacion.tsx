import { Container } from "react-bootstrap";


const Ubicacion = () => {
  return (
    <Container className="my-5 text-center">
      <h2 className="mb-4">📍 Estamos ubicados en</h2>
      <div style={{ width: "100%", height: "400px" }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3344.390222763876!2d-71.457613!3d-33.046192!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689d923bbb81d09%3A0x26dc2f68e08b89e5!2sRELOAD%20MOTOR!5e0!3m2!1ses-419!2scl!4v1758767917381!5m2!1ses-419!2scl" 
        width="1000" 
        height="400" 
        style={{border:0}}
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </Container>
  );
};

export default Ubicacion;