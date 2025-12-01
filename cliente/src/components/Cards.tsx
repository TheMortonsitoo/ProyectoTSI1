import { Card, Button } from "react-bootstrap";

interface CarCardProps {
  titulo: string;
  descripcion?: string;
  precio: number;
  stock: number;
  onAgregar: () => void;
}

const Cards = ({ titulo, descripcion, precio, stock, onAgregar }: CarCardProps) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>

        {descripcion && <Card.Text>{descripcion}</Card.Text>}

        <Card.Text>
          <strong>Precio:</strong> ${precio.toLocaleString()}
        </Card.Text>

        <Card.Text>
          <strong>Stock:</strong>{" "}
          {stock > 0 ? (
            stock
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>Sin stock</span>
          )}
        </Card.Text>

        <Button
          variant="primary"
          onClick={onAgregar}
          disabled={stock <= 0}  //eso pa bloquear el boton cuando ya no hay stock
        >
          {stock > 0 ? "Agregar al carrito" : "No disponible"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
