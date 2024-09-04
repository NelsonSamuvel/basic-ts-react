import { useCart } from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {

    const {totalItems,totalPrice} = useCart();

  return (
    <header>
      <div>
        <h2>Products.Go</h2>
      </div>
      <div className="head-content">
        <p>Total Items:{totalItems}</p>
        <p>Total Price : {totalPrice}</p>
        <button onClick={() => setViewCart((toggle) => !toggle)}>
          {viewCart ? "View Product" : "View Cart"}
        </button>
      </div>
    </header>
  );
};

export default Header;
