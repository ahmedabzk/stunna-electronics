import { TfiCreditCard } from "react-icons/tfi";
import { Link } from "react-router-dom";

function Payment() {
  return (
    <div className="max-w-3xl mx-auto gap-2 shadow-xl">
      <h1 className="text-center mt-2 font-semibold text-slate-600">Payment</h1>
      <p className="text-left ml-[15%]">Payment Options</p>
      <div className="flex flex-col items-center">
        <form className="flex flex-col w-[90%] p-4 gap-4">
          <div className="flex justify-between bg-[#F1F1F1] p-4 shadow-md">
            <div className="flex flex-col gap-2">
              <p>Credit Card</p>
              <p>Pay with Visa, Master Card and other debit or credit card</p>
            </div>
            <TfiCreditCard />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>Accepted Cards</p>
            <div className="flex gap-2">
              <p className="text-slate-500 border font-semibold p-2">Visa</p>
              <p className="text-slate-500 border font-semibold p-2">Master</p>
              <p className="text-slate-500 border font-semibold p-2">
                american express
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-4">
              <label>*Name on Card</label>
              <input
                type="text"
                className="border p-3 rounded-md border-slate-400"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <label>*Card Number</label>
              <input
                type="number"
                className="border p-3 rounded-md border-slate-400"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-4">
              <label>*Expiry Date</label>
              <input
                type="date"
                className="border p-3 rounded-md border-slate-400"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <label>*CCV</label>
              <input
                type="number"
                className="border p-3 rounded-md border-slate-400"
                required
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-end gap-2 mr-12">
        <p>Total:</p>
        <p>Kes 4512</p>
      </div>
      <div className="flex justify-between items-center p-2">
        <Link
          to={"/checkout/step2"}
          className="border p-3 rounded-lg bg-slate-100"
        >
          &#8592;Go back
        </Link>
        <button className="border p-3 rounded-lg bg-slate-800 text-white">
          &#10003;Confirm
        </button>
      </div>
    </div>
  );
}

export default Payment;
