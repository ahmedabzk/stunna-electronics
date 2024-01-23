import { Link } from "react-router-dom";

function WishList() {

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center md:w-[60rem] h-[40rem] shadow-lg ">
      <div className="bg-[#F4F4F4] w-full p-3 flex justify-around">
        <Link to="/profile" className="border hover:bg-[#F9F9F9] p-3 ">
          Account
        </Link>
        <Link
          to="/profile/wish-list"
          className="border hover:bg-[#F9F9F9] p-3"
        >
          My Wish List
        </Link>
        <Link
          to="/profile/my-orders"
          className="border hover:bg-[#F9F9F9] p-3"
        >
          My Orders
        </Link>
      </div>
      <div className="mt-12 bg-[#F4F4F4] w-full h-full flex flex-col items-center justify-center">
        <p className="text-slate-600 font-semibold">My Wish List</p>
        <p className="text-slate-500">
          Your wish list is empty
        </p>
      </div>
    </div>
  );
}

export default WishList;
