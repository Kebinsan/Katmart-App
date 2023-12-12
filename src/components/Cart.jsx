import { useState } from "react";
import CartItem from "./CartItem";
import { Button } from "react-bootstrap";

export default function Cart({ cart, setCart, cartUpdated, setCartUpdated }) {
  const [cartTotal, setCartTotal] = useState(0);

  function clearCart() {
    setCart([]);
    setCartUpdated(1);
  }

  return (
    <>
      {cart.length > 0 ? (
        <>
          <h1 className="page-title">Shopping Cart</h1>
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    cartTotal={cartTotal}
                    setCartTotal={setCartTotal}
                    setCart={setCart}
                    setCartUpdated={setCartUpdated}
                    cartUpdated={cartUpdated}
                    cart={cart}
                  />
                );
              })
            ) : (
              <div>No Results Found</div>
            )}
            <div className="cart-summary">
              <p className="clear-cart" onClick={() => clearCart()}>
                Clear Cart
              </p>

              <div className="cart-summary-items">
                <h5 className="cart-total-cost">
                  Total Cost: ${cartTotal.toFixed(2)}
                </h5>
                <Button className="checkout-button" variant="btn btn-success">
                  Check Out
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="page-title">Cart Empty</h1>
      )}
    </>
  );
}
