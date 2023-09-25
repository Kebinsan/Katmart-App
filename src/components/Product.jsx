import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: "15rem" }}>
        <div
          className="product-click"
          onClick={() => {
            navigate(`/products/product/${product.id}`);
          }}
        >
          <Card.Img
            className="product-click"
            variant="top fluid"
            src={product.image}
          />
          <Card.Title className="product-click">{product.title}</Card.Title>
        </div>
        <Card.Body>
          <Card.Text>
            <Rating rating={product.rating} />
          </Card.Text>
          <Card.Text className="price-tag">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
