import { PiEyeglassesBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CartProgressContext from "../context/CartProgress";
import CartContext from "../context/CartContext";
import { useContext } from "react";
import Cart from "./Cart";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const cartProgress = useContext(CartProgressContext);
  const userCtx = useContext(UserContext);

  console.log(userCtx.current_user);

  const navigate = useNavigate();

  const cartItem = cartCtx.products.length;


  const handleShowCart = () => {
    cartProgress.setIsCartOpen(true);
  }

  const handleLogout = () => {
    userCtx.logout();
    navigate('/sign-in');
  };



  return (
    <header className="flex justify-between items-center mt-5 gap-4 m-2 z-0">
      <div className="flex gap-4 ml-7">
        <div className="flex flex-col items-center md:flex-row">
          <Link to="/">
            <PiEyeglassesBold className="w-16 h-16" />
            <div>
              <h1 className="font-semibold uppercase">stunna</h1>
              <span className="font-thin text-black">eyewear</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/featured">Featured</Link>
          <Link to="/recommended">Recommended</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 mr-7">
        <form className="bg-slate-100 p-2 border rounded-lg flex justify-between items-center gap-2">
          <CiSearch className="text-slate-600 hover:cursor-pointer" />
          <input
            type="text"
            placeholder="search"
            className="bg-transparent focus:outline-none w-full"
          />
        </form>
        <button
          onClick={handleShowCart}
          className=" flex flex-col items-center w-12 h-12"
        >
          <p className="text-red-700 text-sm absolute mt-4">{cartItem}</p>
          <MdOutlineShoppingBag className="w-16 h-16" />
        </button>
        {userCtx.current_user ? (
          <div className="flex gap-2">
            <Link to={"/profile"}>
              <img src={userCtx.current_user.imageUrl} className="rounded-full w-9 h-9 object-cover"/>
            </Link>
            <button
              onClick={handleLogout}
              className="border p-2 rounded-md bg-slate-100 hover:bg-slate-700 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/sign-up"
              className="bg-slate-950 uppercase rounded-lg border text-white p-3 hover:opacity-95"
            >
              Signup
            </Link>
            <Link
              to="/sign-in"
              className="bg-slate-200 text-black uppercase border rounded-lg p-3 hover:opacity-95"
            >
              Sigin
            </Link>
          </div>
        )}
      </div>
      {cartProgress.isCartOpen && <Cart />}
    </header>
  );
}