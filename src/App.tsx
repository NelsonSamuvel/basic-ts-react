import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import { ProductsProvider } from "./context/ProductsProvider";
import { CartProvider } from "./context/CartProvider";

function App() {
  const [viewCart, setViewCart] = useState(false);

  const mainContent = viewCart ? <Cart /> : <ProductsList />;

  return (
    <ProductsProvider>
      <CartProvider>
        <Header viewCart={viewCart} setViewCart={setViewCart} />
        {mainContent}
        <Footer viewCart={viewCart} />
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
