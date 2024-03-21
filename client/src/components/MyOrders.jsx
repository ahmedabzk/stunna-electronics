import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const server_url = import.meta.env.VITE_SERVER_URL;

function MyOrders() {
  const userCtx = useContext(UserContext);

  const id = userCtx.current_user._id;


  const {data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch(`${server_url}/api/v1/order/get/order/${id}`, {
        headers: { 'Content-Type': 'application/json'},
        'credentials': "include",
      });
       if (!res.ok) {
         const error = new Error("failed to fetch different items");
         error.code = res.statusCode;
         error.info = await res.json();
         throw error;
       }
      
      const product = await res.json();
      return product;
    }
  })


    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    }

    if (isError) {
      return <p>{error.info?.message}</p>;
    }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center md:w-[65rem] h-[40rem] shadow-lg ">
      <div className="bg-[#F4F4F4] w-full p-3 flex justify-around">
        <Link to="/profile" className="border hover:bg-[#F9F9F9] p-3 ">
          Account
        </Link>
        <Link to="/profile/wish-list" className="border hover:bg-[#F9F9F9] p-3">
          My Wish List
        </Link>
        <Link to="/profile/my-orders" className="border hover:bg-[#F9F9F9] p-3">
          My Orders
        </Link>
      </div>
      <div className="mt-12 bg-[#F4F4F4] w-full h-full flex flex-col">
        <p className="text-slate-600 font-semibold">My Orders</p>
        {data ? (
          data.map((order) => (
            <div
              key={order._id}
              className="flex flex-col gap-6 w-full border rounded-lg border-slate-300 md:flex-row"
            >
              <div className="">
                <h4 className="font-semibold">Product</h4>
                {order.products.map((product) => (
                  <div key={product.productId} className="flex gap-4">
                    <img
                      src={product.image}
                      alt="product"
                      className="w-12 h-12 rounded-xl object-contain"
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-slate-600">{product.name}</p>
                      <p className="text-slate-600">{product.brand}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">Quantity</p>
                      <p className="text-slate-600">{product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Shipping Details</p>

                <p className="font-semibold">
                  City:{" "}
                  <span className="font-normal text-slate-600">
                    {order.shipping.address.city}
                  </span>
                </p>

                <p className="font-semibold">
                  Country:{" "}
                  <span className="font-normal text-slate-600">
                    {order.shipping.address.country}
                  </span>
                </p>

                <p className="font-semibold">
                  Line1:{" "}
                  <span className="font-normal text-slate-600">
                    {order.shipping.address.line1}
                  </span>
                </p>

                <p className="font-semibold">
                  Postal Code:{" "}
                  <span className="font-normal text-slate-600">
                    {" "}
                    {order.shipping.address.postal_code}
                  </span>
                </p>

                <p className="font-semibold">
                  Email:{" "}
                  <span className="font-normal text-slate-600">
                    {order.shipping.email}
                  </span>
                </p>

                <p className="font-semibold">
                  Name:{" "}
                  <span className="font-normal text-slate-600">
                    {" "}
                    {order.shipping.name}
                  </span>
                </p>

                <p className="font-semibold">
                  Phone:{" "}
                  <span className="font-normal text-slate-600">
                    {order.shipping.phone}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  Amount paid:{" "}
                  <span className="font-normal text-slate-600">
                    {" "}
                    {order.amountPaid}
                  </span>
                </p>
                <p className="font-semibold">
                  Delivery status:{" "}
                  <span className="font-normal text-slate-600">
                    {order.delivery_status}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            You don&apos;t have any orders right now
          </p>
        )}
      </div>
    </div>
  );
}

export default MyOrders