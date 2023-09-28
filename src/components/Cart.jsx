import { useState } from "react";
import CartItem from "./CartItem";

export default function Cart({ cart, setCart, cartUpdated, setCartUpdated }) {
  const [cartTotal, setCartTotal] = useState(0);
  console.log(cartTotal);
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

            <div>${cartTotal}</div>
            <button onClick={() => setCart([])}>Clear Cart</button>
          </div>
        </>
      ) : (
        <h1 className="page-title">No items in Cart</h1>
      )}
    </>
  );
}
