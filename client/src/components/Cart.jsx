import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import CartProgressContext from "../context/CartProgress";
import { UserContext } from "../context/UserContext";
import CartItems from "./CartItems";

import { formatter } from "../utils/formatter";
import PayButton from "./PaymentButton";

function Cart() {
  const cartCtx = useContext(CartContext);
  const ctProgress = useContext(CartProgressContext);

  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const totalAmount = cartCtx.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  const handleClose = () => {
    ctProgress.setIsCartOpen(false);
  };


  const handleClear = () => {
    cartCtx.clearCart();
  };

  return (
    <section className="fixed w-[30rem] md:w-[50rem] h-[100vh] z-30 top-0 right-0 bg-slate-50 border border-slate-300 overflow-y-scroll transition-transform">
      <div className="flex flex-col">
        <div className="sticky">
          <div className="flex justify-between items-center mt-2 m-2">
            <p className="font-bold">My Cart: ({cartCtx.products.length})</p>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="border border-slate-300  p-2 uppercase"
              >
                Close
              </button>
              <button
                onClick={handleClear}
                className="border border-slate-300 p-2 uppercase"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="m-2 flex flex-col gap-2 mb-16">
          {cartCtx.products.length > 0 ? (
            <CartItems />
          ) : (
            <p className="text-center">No items in the cart</p>
          )}
        </div>
        <div className="fixed bottom-0 right-0 w-[30rem] md:w-[50rem] bg-gray-100">
          <div className="flex justify-between items-center border border-slate-300 p-2">
            <div className="flex flex-col items-center">
              <p className="font-bold text-slate-700">Subtotal Amount:</p>
              <p className="font-bold text-slate-700">
                {formatter.format(totalAmount)}
              </p>
            </div>
            {userCtx.current_user._id ? (
              <PayButton cartItems={cartCtx.products} />
            ) : (
              <button className="cart-login" onClick={() => navigate("/sign-in")}>
                Login to Check out
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
