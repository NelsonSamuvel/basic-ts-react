import { ProductsType } from "../context/ProductsProvider";
import { ActionType, ReducerActionType } from "../context/CartProvider";
import { formatCurrency } from "../utils/helper";
import { memo } from "react";

type PropsType = {
  product: ProductsType;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
  dispatch: React.Dispatch<ActionType>;
};

const Product = ({ product, REDUCER_ACTIONS, inCart, dispatch }: PropsType) => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  function onAddToCart(curProduct: ProductsType) {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...curProduct, qty: 1 } });
  }

  const addedCartContent = inCart ? "Already added to cart ✅" : null;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div className="img-div">
        <img src={img} alt="" className="product-img" />
      </div>
      <div>
        <p>
          {formatCurrency(product.price)}
          <span> {addedCartContent}</span>
        </p>
        <button onClick={() => onAddToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
};

function areProductEqual(
  { product: prevItem, inCart: prevCart }: PropsType,
  { product: nextItem, inCart: nextCart }: PropsType
) {
  return (
    Object.keys(prevItem).every(
      (key) =>
        prevItem[key as keyof ProductsType] ===
        nextItem[key as keyof ProductsType]
    ) && prevCart === nextCart
  );
}

const MemoizedProduct = memo(Product, areProductEqual);

export default MemoizedProduct;
