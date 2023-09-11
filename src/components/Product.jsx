import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Product({ product, setSelectedProduct }) {
  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: "15rem" }}>
        <div
          className="product-click"
          onClick={() => {
            setSelectedProduct(product);
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
          <Card.Text>Rating: {product.rating.rate}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
