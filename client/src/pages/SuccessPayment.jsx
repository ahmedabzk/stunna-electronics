

function SuccessPayment() {
  return (
    <div className="flex flex-col items-center w-[100%] m-auto min-h-[80vh] max-w-[800px] space-y-6">
      <h2 className="font-semibold text-xl shadow-md text-slate-500">
        Checkout Successful
      </h2>
      <p className="font-semibold text-sm text-slate-500">
        Your order might take some time to process.
      </p>
      <p className="font-semibold text-sm text-slate-500">
        Check your order status at your profile after about 10mins.
      </p>
      <p className="font-semibold text-sm text-slate-500">
        Incase of any inqueries contact the support at{" "}
        <strong className="text-slate-800 text-lg underline">support@example.com</strong>
      </p>
    </div>
  );
}

export default SuccessPayment;