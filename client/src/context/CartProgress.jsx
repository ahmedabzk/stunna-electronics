import { createContext, useState } from "react";

export const CartProgressContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () =>{}

});

export function CartProgressContextProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const valueProgress = {
    isCartOpen, setIsCartOpen
  };

  return (
    <CartProgressContext.Provider value={valueProgress}>
      {children}
    </CartProgressContext.Provider>
  );
}

export default CartProgressContext;
