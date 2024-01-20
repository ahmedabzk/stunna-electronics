import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { formatter } from "../utils/formatter";

function Order() {
  const cartCtx = useContext(CartContext);

 



  const total = cartCtx.products.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.price;
  }, 0);

   const [internationalShipping, setinternationalShipping] = useState(total);

  const handleChecked = (e) => {
    setinternationalShipping({
      ...internationalShipping,
      [e.target.id]: e.target.checked
    })
  }

    console.log(internationalShipping);

  return (
    <section className="flex flex-col justify-center items-center border max-w-3xl mx-auto gap-2 shadow-xl">
      <h1 className="mt-3 font-semibold text-slate-600">Shipping Details</h1>
      <form className="flex flex-col w-full gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <label>*Full Name</label>
            <input
              type="text"
              className="border p-3 border-slate-400"
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <label>*Email Address</label>
            <input
              type="email"
              className="border p-3 border-slate-400"
              required
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <label>*Shipping Address</label>
            <input
              type="text"
              className="border p-3 border-slate-400"
              required
            />
          </div>
          <div className="flex flex-col justify-between">
            <label>Mobile Number</label>
            <div className="flex">
              <select className="p-3 border bg-slate-50"></select>
              <input type="text" className="border p-3 border-slate-400" />
            </div>
          </div>
        </div>

        <div className="border bg-slate-50 w-full p-4 flex justify-between">
          <div className="flex gap-4">
            <input type="checkbox" onChange={handleChecked} id="check"/>
            <p>
              International Shipping{" "}
              <span className="text-slate-500">7-14 days</span>
            </p>
          </div>
          <p>Kes1000</p>
        </div>
        <div className="flex justify-end gap-7">
          <p>International Shipping:</p>
          <p>Kes0</p>
        </div>
        <div className="flex justify-end gap-7">
          <p>Total:</p>
          <p>{formatter.format(total)}</p>
        </div>
      </form>
      <div className="flex justify-between w-full p-4">
        <Link
          to={"/checkout/step1"}
          className="border rounded-lg p-3 bg-slate-100 hover:bg-slate-200"
        >
          Go back
        </Link>
        <Link
          to={"/checkout/step3"}
          className="border rounded-lg p-3 bg-slate-800 text-white"
        >
          Go to payment
        </Link>
      </div>
    </section>
  );
}

export default Order;
