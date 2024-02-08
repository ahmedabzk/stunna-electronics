import { createContext, useEffect, useReducer } from "react";


const CartContext = createContext({
  products: [],
  addToCart: () => {},
  removeFromCart: () => { },
  handleRemove: () => { },
  clearCart: () => {},
});





function cartReducer(state, action) {
  if (action.type === "ADD_TO_CART") {
    const updatedProducts = [...state.products];

    const existingCartItemIndex = updatedProducts.findIndex(
      (item) => item._id === action.payload._id
    );

    const existingCartItem = updatedProducts[existingCartItemIndex];

    if (existingCartItemIndex > -1) {
      const updatedProduct = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedProducts[existingCartItemIndex] = updatedProduct;
    } else {
      updatedProducts.push({ ...action.payload, quantity: 1 });
    }

    return { ...state, products: updatedProducts };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const updatedProducts = [...state.products];

    const existingCartItemIndex = updatedProducts.findIndex(
      (item) => item._id === action.payload
    );

    const existingCartItem = updatedProducts[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      updatedProducts.splice(existingCartItem, 1);
    } else {
      const updatedProduct = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedProducts[existingCartItemIndex] = updatedProduct;
    }
    return { ...state, products: updatedProducts };
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedProducts = [...state.products];
    const updatedProduct = updatedProducts.filter((product) => product._id !== action.payload);
    return { ...state, products: updatedProduct };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, products: [] };
  }

  return state;
}

const getItemFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { products: [] };
};

export function CartContextProvider({ children }) {

  const [cartState, cartStateDispatch] = useReducer(cartReducer, {products: []}, getItemFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  function handleAddToCart(product) {
    cartStateDispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  }

  function handleRemoveFromCart(id) {
    cartStateDispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  }

  function handleRemove(id) {
    cartStateDispatch({ type: "REMOVE_ITEM", payload: id });
  }
  function handleClearCart() {
    cartStateDispatch({
      type: "CLEAR_CART",
    });
  }

  console.log(cartState.products);


  const valueCart = {
    products: cartState.products,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    handleRemove,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={valueCart}>{children}</CartContext.Provider>
  );
}

export default CartContext;
