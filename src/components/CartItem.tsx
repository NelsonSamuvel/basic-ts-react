import { ChangeEvent, memo, useState } from "react";
import {
  ActionType,
  CartItemType,
  ReducerActionType,
} from "../context/CartProvider";
import { formatCurrency } from "../utils/helper";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ActionType>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const img = new URL(`../images/${item.sku}.jpg`, import.meta.url).href;

  const qtyCount = 20 > item.qty ? 20 : item.qty + 20;

  const totalItemPrice = item.qty * item.price;

  const numArr: number[] = [...Array(qtyCount).keys()].map((i) => i + 1);

  const optionEl = numArr.map((opt) => (
    <option key={`opt${opt}`} value={opt}>
      {opt}
    </option>
  ));

  function handleQty(e: ChangeEvent<HTMLSelectElement>): void {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  }

  function handleRemove() {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });
  }

  return (
    <li className="cart-item">
      <div aria-label="product-img" className="product-name">
        <img src={img} alt="" className="cart-img" />
        <p aria-label="Product-name">{item.name}</p>
      </div>
      <div aria-label="product-info" className="product-info">
        <p>{item.price}</p>
        <select name="qty" value={item.qty} onChange={handleQty}>
          {optionEl}
        </select>
        <p>{formatCurrency(totalItemPrice)}</p>
        <button onClick={handleRemove}>❌</button>
      </div>
    </li>
  );
};

const areItemEquals = (
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) => {
  return Object.keys(prevItem).every(
    (key) =>
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
  );
};

// const memoizedCartItem = memo(CartItem, areItemEquals);

// export default memoizedCartItem;

export default CartItem;
