import { createContext, ReactElement, useEffect, useState } from "react";

export type ProductsType = {
  sku: string;
  name: string;
  price: number;
};

// const initState: ProductsType[] = [];

const initState: ProductsType[] = [
  {
    sku: "item0001",
    name: "Widget",
    price: 9.99,
  },
  {
    sku: "item0002",
    name: "Premium Widget",
    price: 19.99,
  },
  {
    sku: "item0003",
    name: "Deluxe Widget",
    price: 29.99,
  },
];

export type UseProductsContextType = {
  products: ProductsType[];
  isLoading: boolean;
};

const initContext: UseProductsContextType = { products: [], isLoading: false };

const ProductsContext = createContext<UseProductsContextType>(initContext);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<ProductsType[]>(initState);
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async (): Promise<ProductsType[]> => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("http://localhost:3500/products");
  //       const data = await res.json();
  //       return data;
  //     } catch (err) {
  //       if (err instanceof Error) console.error(err.message);
  //       return [];
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts().then((data) => setProducts(data));
  // }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};


export default ProductsContext;