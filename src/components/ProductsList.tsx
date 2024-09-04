import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import Product from "./Product";

const ProductsList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products, isLoading } = useProducts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="products-container">
      {products.map((product) => {
        const inCart = cart.some((item) => item.sku === product.sku);
        //  cartItem ? "added to the cart ✅" : null;
        return (
            <Product
              key={product.sku}
              product={product}
              dispatch={dispatch}
              inCart={inCart}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
    
        );
      })}
    </div>
  );
};

export default ProductsList;
