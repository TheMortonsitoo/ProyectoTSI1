import { Card, Button } from "react-bootstrap";

interface CarCardProps {
  titulo: string;
  descripcion?: string;
  precio: number; // 👈 ahora es number
  onAgregar: () => void;
}

const Cards = ({ titulo, descripcion, precio, onAgregar }: CarCardProps) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        {descripcion && <Card.Text>{descripcion}</Card.Text>}
        <Card.Text>
          <strong>Precio:</strong> ${precio.toLocaleString()} {/* 👈 formateo */}
        </Card.Text>
        <Button variant="primary" onClick={onAgregar}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
