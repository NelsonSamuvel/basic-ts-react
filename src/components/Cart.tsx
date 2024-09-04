import { useState } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const { dispatch, cart, REDUCER_ACTIONS, totalItems, totalPrice } = useCart();

  const [order, setOrder] = useState(false);

  function handleOrder() {
    setOrder((order) => !order);
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
  }

  const renderPage = order ? (
    <h3>Your order has been success</h3>
  ) : (
    <div className="cart-info">
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.sku}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
            item={item}
          />
        ))}
      </ul>
      <div className="head-content">
        <p>Total Items:{totalItems}</p>
        <p>Total Price : {totalPrice}</p>
        <button onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );

  return <div>{renderPage}</div>;
};

export default Cart;
