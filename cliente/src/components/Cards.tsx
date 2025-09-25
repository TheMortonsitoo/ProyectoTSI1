import { Card, Button } from "react-bootstrap";

interface CarCardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  precio: string
  onAgregar: () => void;
}

const Cards = ({ titulo, imagen, descripcion, precio, onAgregar }: CarCardProps) => {
  return (
    <Card className="mb-1 shadow-sm"
      style={{ height: "100%" }}>
      <Card.Img variant="top" src = {imagen} style={{height: "250px", objectFit: "contain"}} />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Text>Precio: ${precio}</Card.Text>
        <Button className="w-100" onClick={onAgregar}> Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
