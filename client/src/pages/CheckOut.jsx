import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import CartContext from "../context/CartContext";
import { useContext } from "react";

import { formatter } from "../utils/formatter";
import PayButton from "../components/PaymentButton";

function CheckOut() {
  const ctx = useContext(CartContext);
  const total = ctx.products.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.price;
  }, 0);
  return (
    <div className="flex flex-col max-w-4xl mx-auto border p-2 shadow-xl">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-slate-600">Order Summary</h1>
        <p>Review items in your cart.</p>
      </div>

      <div className="w-full p-4">
        <CartItems />
      </div>
      <div className="flex flex-col items-end">
        <p>Subtotal:</p>
        <p>{formatter.format(total)}</p>
      </div>
      <div className="flex justify-between">
        <Link
          to={"/"}
          className="border bg-slate-100  hover:bg-slate-200 p-3 rounded-lg"
        >
          Continue Shopping
        </Link>
        <PayButton
          cartItems={ctx.products}
          handleClear={() => {
            ctx.clearCart();
          }}
        />
      </div>
    </div>
  );
}

export default CheckOut;
