import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Rating from "./Rating";
import { fetchProduct } from "../api/server";
import { Spinner } from "react-bootstrap";

export default function ProductInfo({
  setCart,
  cart,
  setCartUpdated,
  cartUpdated,
}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  /**
   * Gets the product to be displayed based on product id in route param
   */
  useEffect(() => {
    const getProduct = async () => {
      const result = await fetchProduct(id);
      setProduct(result);
      setLoading(false);
    };
    getProduct();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let found = false;
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity += quantity;
        found = true;
      }
    });
    if (!found) {
      const newItem = { id: id, quantity: quantity };
      setCart([...cart, newItem]);
    }
    setCartUpdated(!cartUpdated);
  };

  return (
    <>
      {
        /*displays loading spinner while waiting on products to fetch*/
        loading ? (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="item-info-container">
              <div className="item-info-left">
                <h3>{product?.title}</h3>
                <img
                  className="single-prod-img"
                  src={product?.image}
                  alt="product image could not be found"
                ></img>
              </div>
              <div className="item-info-right">
                <p>${product?.price}</p>
                <Rating rating={product?.rating} />
                <form onSubmit={handleSubmit}>
                  <input
                    className="quantity-form"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="99"
                    defaultValue={quantity}
                    onChange={(event) => {
                      setQuantity(parseInt(event.target.value));
                    }}
                  />
                  <Button variant="btn btn-success" type="submit">
                    Add to Cart
                  </Button>
                </form>
              </div>
            </div>
            <div className="product-overview">
              <p>
                <b>Category: </b>
                {product?.category}
              </p>
              <p>{product?.description}</p>
            </div>
          </>
        )
      }
    </>
  );
}
