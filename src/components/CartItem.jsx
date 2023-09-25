import { useState, useEffect } from "react";
import { fetchProduct } from "../api/server";
import { Spinner } from "react-bootstrap";

export default function CartItem({ item, setCartTotal, cartTotal }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      const result = await fetchProduct(item.id);
      setProduct(result);
      setCartTotal(cartTotal + product?.price * item.quantity);
      setLoading(false);
    };
    getItem();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="cart-item">
          <div className="cart-info-left">
            <img src={product.image} alt="image could not be found" />
            <p>{product.title}</p>
          </div>
          <div className="cart-info-right">
            <p>{item.quantity}</p>
            <p>${product.price * item.quantity}</p>
          </div>
        </div>
      )}
    </>
  );
}
