import { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Account() {
  const userCtx = useContext(UserContext);
  console.log(userCtx.current_user.role);

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center md:w-[60rem] h-[40rem] shadow-lg ">
      <div className="bg-[#F4F4F4] w-full p-3 flex justify-around">
        <Link to="/account" className="border hover:bg-[#F9F9F9] p-3 ">
          Account
        </Link>
      </div>
      <div className="flex justify-between w-full p-4">
        <img
          src={userCtx.current_user.imageUrl}
          className="rounded-full w-9 h-9 object-cover"
        />
        <Link
          to="/account/edit-account"
          className="border bg-slate-800 text-white p-3 hover:shadow-lg"
        >
          Edit Account
        </Link>
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-5">
        <p className="border p-3 rounded-lg w-full">
          Name: {userCtx.current_user.name}
        </p>
        <p className="border p-3 rounded-lg w-full">
          Email: {userCtx.current_user.email}
        </p>
        <p className="border p-3 rounded-lg w-full">Mobile: no mobile number</p>
      </div>
    </div>
  );
}

export default Account;
