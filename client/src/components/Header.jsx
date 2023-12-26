import { PiEyeglassesBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-6">
      <div className=" flex justify-between items-center gap-4">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col items-center lg:flex-row">
            <PiEyeglassesBold className="w-16 h-16" />
            <div className="">
              <h1 className="font-semibold uppercase">stunna</h1>
              <span className="font-thin text-black">eyewear</span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center lg:flex-row gap-4">
            <Link>Home</Link>
            <Link>Shop</Link>
            <Link>Featured</Link>
            <Link>Recommended</Link>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 mr-8">
          <form className="bg-slate-100 p-3 border rounded-lg flex justify-between items-center gap-2">
            <CiSearch className="text-slate-600 " />
            <input
              type="text"
              placeholder="search"
              className="bg-transparent focus:outline-none"
            />
          </form>
          <div className=" flex items-center w-18 h-18">
            <LuShoppingCart />
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-950 uppercase rounded-lg border text-white p-3">
              signup
            </button>
            <button className="bg-slate-200 text-black uppercase border rounded-lg p-3">
              sigin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
