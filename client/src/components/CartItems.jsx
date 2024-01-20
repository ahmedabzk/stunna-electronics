import { useContext } from "react";
import CartContext from "../context/CartContext";


function CartItems() {
  const cartCtx = useContext(CartContext);
  return (
    <div>
      {cartCtx.products.map((product) => (
        <div
          key={product._id}
          className="flex justify-between items-center shadow-sm border border-slate-200"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => cartCtx.addToCart(product)}
              className="border border-slate-300  uppercase font-bold text-2xl p-2"
            >
              +
            </button>
            <button
              onClick={() => cartCtx.removeFromCart(product._id)}
              className="border border-slate-300  uppercase font-bold text-2xl p-2"
            >
              -
            </button>
          </div>
          <img src={product.images} className="w-[200px] object-contain" />
          <div>
            <p className="underline">{product.name}</p>
            <p>Quantity</p>
            <p>{product.quantity}</p>
          </div>
          <div>
            <p>Size</p>
            <p>{product.size}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>Color</p>
            <p
              style={{
                backgroundColor: product.selectedColor || product.colors[0],
                width: "14px",
                height: "14px",
                borderRadius: "50%",
              }}
            ></p>
          </div>
          <p>{product.price}</p>
          <button
            onClick={() => cartCtx.handleRemove(product._id)}
            className="text-lg"
          >
            &#10005;
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
