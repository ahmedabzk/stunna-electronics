
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CartProgressContext from "../context/CartProgress";
import CartContext from "../context/CartContext";
import { useContext, useState } from "react";
import Cart from "./Cart";
import { UserContext } from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { fetchLogOut } from "../utils/http";
import { TfiAlignJustify } from "react-icons/tfi";

import { menuItems } from "../utils/menuItems";

export default function Header() {
  
  const cartCtx = useContext(CartContext);
  const cartProgress = useContext(CartProgressContext);
  const userCtx = useContext(UserContext);

  const {mutate}= useMutation({
    mutationFn: fetchLogOut,
    mutationKey: ['user'],
    onSuccess: () => {
        userCtx.logout();
    }
  })

  const navigate = useNavigate();

  const cartItem = cartCtx.products && cartCtx.products.length > 0 ? cartCtx.products.length : 0;


  const handleShowCart = () => {
    cartProgress.setIsCartOpen(true);
  }

  const handleLogout = () => {
    mutate();
    navigate('/sign-in');
  };



  return (
    <header className="flex flex-col bg-[#F3F3F3] p-3">
      {/* upper side */}
      <div className="flex items-center justify-between w-full md:m-2">
        <Link to="/">
          <h1 className="text-3xl font-bold">Logo</h1>
        </Link>
        <div className="flex items-center gap-2 md:m-2 md:w-[40%] w-[30%]">
          <form className="bg-slate-100 p-2 border border-slate-400 rounded-lg flex justify-between items-center gap-2 w-full">
            <CiSearch className="text-slate-600 hover:cursor-pointer" />
            <input
              type="text"
              placeholder="search"
              className="bg-transparent focus:outline-none w-full"
            />
          </form>
        </div>
        <div className="flex items-center md:mr-4 md:gap-6">
          <button
            onClick={handleShowCart}
            className=" flex flex-col items-center w-9 h-9"
          >
            <p className="text-red-700 text-sm absolute mt-3">{cartItem}</p>
            <MdOutlineShoppingBag className="w-14 h-14" />
          </button>
          {userCtx.current_user ? (
            <div className="flex gap-2">
              <Link to={"/profile"}>
                <img
                  src={userCtx.current_user.imageUrl}
                  className="rounded-full w-9 h-9 object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="border p-2 rounded-md text-white bg-slate-700 hover:scale-105"
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
      </div>
      {/* lower side */}
      <div className="flex items-center w-full md:m-3 gap-4 md:gap-8 shadow-inner">
        <div className="flex items-center gap-2">
          <TfiAlignJustify className="w-10 h-10" />
          <span>All</span>
        </div>
        <div className="flex items-center md:w-[25%] gap-8 ">
          <Link to="/shop">Shop</Link>
          <Dropdown />
          <Link to="/about">About</Link>
        </div>
      </div>
      {cartProgress.isCartOpen && <Cart />}
    </header>
  );
}


function Dropdown() {
   const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  
  return (
    <div className="flex gap-10 m-0">
      {menuItems.map((menu, index) => (
        <div key={index}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== menu.title ? setHeading(menu.title) : setHeading("");
                setSubHeading("");
              }}
            >
              {menu.title}
              <span className="text-xl inline">
                <ion-icon
                  name={`${heading === menu.title ? "chevron-up" : "chevron-down"
                    }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {menu.submenu && (
              <div>
                <div className="absolute left-32 top-36 hidden group-hover:block hover:block">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                    mt-1 bg-white rotate-45"
                    ></div>
                  </div>
                  <div className="bg-white p-5 grid grid-cols-3 gap-10">
                    {menu.submenu.map((submenu, index) => (
                      <div key={index}>
                        <h1 className="text-lg font-semibold">{submenu.title}</h1>
                        {submenu.sub.map((sub, index) => (
                          <li
                            key={index}
                            className="text-sm font-medium text-gray-600 my-2.5"
                          >
                            <Link to={sub.url} className="hover:text-primary hover:border hover:rounded-lg hover:p-2 hover:border-slate-500">
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}



