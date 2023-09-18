import { Button } from "react-bootstrap";
import Rating from "./Rating";

export default function ProductInfo({ product, setCart }) {
  const handleSubmit = () => {};
  const handleChange = (event) => {};
  return (
    <>
      <div className="item-info-container">
        <div className="item-info-left">
          <h3>{product?.title}</h3>
          <img
            className="single-prod-img"
            src={product?.image}
            alt="product image could not be found"
          ></img>
          <p>{product?.category}</p>
          <p>{product?.description}</p>
        </div>
        <div className="item-info-right">
          <p>${product?.price}</p>
          <Rating rating={product.rating} />
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="99"
              onChange={(event) => {
                handleChange;
              }}
            />
            <Button variant="btn btn-light" type="submit">
              Add to Cart
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
