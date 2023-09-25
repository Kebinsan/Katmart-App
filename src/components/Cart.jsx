import { useState } from "react";
import CartItem from "./CartItem";

export default function Cart({ cart, setCart }) {
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="cart-header">
            <div className="cart-info-left">
              <p>Item</p>
            </div>
            <div className="cart-info-right">
              <p>Quantity</p>
              <p>Total</p>
            </div>
          </div>
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    cartTotal={cartTotal}
                    setCartTotal={setCartTotal}
                  />
                );
              })
            ) : (
              <div>No Results Found</div>
            )}
          </div>
          <div>${cartTotal}</div>
          <button onClick={() => setCart([])}>Clear Cart</button>
        </>
      ) : (
        <h1 className="page-title">No items in Cart</h1>
      )}
    </>
  );
}
