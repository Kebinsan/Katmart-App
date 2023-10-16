import { useState, useEffect } from "react";
import { fetchProduct } from "../api/server";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function CartItem({
  item,
  setCartTotal,
  cartTotal,
  setCart,
  cartUpdated,
  setCartUpdated,
  cart,
}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * fetch product for additional product info
   */
  useEffect(() => {
    const getItem = async () => {
      const result = await fetchProduct(item.id);
      setProduct(result);

      setLoading(false);
    };
    getItem();
  }, []);

  /**
   * adds up the total cost of items in the cart after products are done loading
   */
  useEffect(() => {
    if (!loading) {
      setCartTotal(cartTotal + product?.price * item.quantity);
    }
  }, [loading]);

  const removeHandler = () => {
    setCart(cart.filter((obj) => parseInt(obj.id) !== product.id));
    setCartUpdated(!cartUpdated);
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="cart-item">
          <img
            src={product.image}
            alt="image could not be found"
            onClick={() => {
              navigate(`/products/product/${product.id}`);
            }}
          />
          <div className="cart-info">
            <h5
              onClick={() => {
                navigate(`/products/product/${product.id}`);
              }}
            >
              {product.title}
            </h5>
            <p>${product.price}</p>
            <form>
              <label htmlFor="quantity">QTY: </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="99"
                defaultValue={item.quantity}
                onChange={(event) => {
                  cart.forEach((obj) => {
                    if (parseInt(obj.id) === product.id) {
                      obj.quantity = parseInt(event.target.value);
                      setCartUpdated(!cartUpdated);
                    }
                  });
                }}
              />
            </form>
            <p className="link-style del" onClick={removeHandler}>
              Delete
            </p>
          </div>
        </div>
      )}
    </>
  );
}
