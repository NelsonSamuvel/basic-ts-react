import { useContext } from "react";
import ProductsContext, {
  UseProductsContextType,
} from "../context/ProductsProvider";

export const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};
