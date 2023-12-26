import { PiEyeglassesBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center mt-5 gap-4 m-2">
      <div className="flex gap-4 ml-7">
        <div className="flex flex-col items-center md:flex-row">
          <PiEyeglassesBold className="w-16 h-16" />
          <div>
            <h1 className="font-semibold uppercase">stunna</h1>
            <span className="font-thin text-black">eyewear</span>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-4">
          <Link>Home</Link>
          <Link>Shop</Link>
          <Link>Featured</Link>
          <Link>Recommended</Link>
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
        <div className=" flex items-center w-16 h-18">
          <LuShoppingCart />
        </div>
        <div className="flex gap-2">
          <Link to="/sign-up" className="bg-slate-950 uppercase rounded-lg border text-white p-3 hover:opacity-95">
            signup
          </Link>
          <Link to="/sign-in" className="bg-slate-200 text-black uppercase border rounded-lg p-3 hover:opacity-95">
            sigin
          </Link>
        </div>
      </div>
    </header>
  );
}
