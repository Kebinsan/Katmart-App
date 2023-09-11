import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Product({ product }) {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top fluid" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
