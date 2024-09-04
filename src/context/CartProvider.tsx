import { createContext, ReactElement, useMemo, useReducer } from "react";
import { formatCurrency } from "../utils/helper";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPES = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPES;

export type ActionType = {
  type: string;
  payload?: CartItemType;
};

const reducer = (state: CartStateType, action: ActionType): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD: {
      if (!action.payload)
        throw new Error("action.payload is not defined in ADD action");
      const { sku, name, price } = action.payload;
      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      const findItem = state.cart.find((item) => item.sku === sku);
      const qty = findItem ? findItem.qty + 1 : 1;
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPES.REMOVE: {
      if (!action.payload)
        throw new Error("action.payload is not defined in REMOVE action");

      const { sku } = action.payload;
      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPES.QUANTITY: {
      if (!action.payload)
        throw new Error("action.payload is not defined in REMOVE action");

      const { sku, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) throw new Error("item does not exist in cart");

      const updatedItem = { ...itemExists, qty };

      const filteredCart = state.cart.filter((item) => item.sku !== sku);
      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    case REDUCER_ACTION_TYPES.SUBMIT: {
      return { ...state, cart: [] };
    }

    default: {
      throw new Error("action type not supported");
    }
  }
};

const useCartContext = (initCart: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCart);

  const REDUCER_ACTIONS: ReducerActionType = useMemo(() => {
    return REDUCER_ACTION_TYPES;
  }, []);

  const totalItems = state.cart.reduce((prev, cur) => prev + cur.qty, 0);

  const totalPrice = formatCurrency(
    state.cart.reduce((prev, cur) => prev + cur.price * cur.qty, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });
  return { dispatch, cart, totalItems, totalPrice, REDUCER_ACTIONS };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContext: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPES,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

const CartContext = createContext<UseCartContextType>(initCartContext);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
