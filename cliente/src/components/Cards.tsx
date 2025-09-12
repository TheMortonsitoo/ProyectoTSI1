import { Card, Button } from "react-bootstrap";

interface CarCardProps {
  titulo: string;
}

const Cards = ({ titulo }: CarCardProps) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Button variant="primary">Ver más</Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
