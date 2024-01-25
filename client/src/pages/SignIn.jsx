import { FaGoogle } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { BsGithub } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { fetchLogin } from '../utils/http';

import { UserContext } from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";

function SignIn() {
  const [formData, setFormData] = useState({});
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const { mutate, data, isError, error,status} = useMutation({
    mutationFn: fetchLogin,
    mutationKey: ['user'],
    onSuccess: (data) => {
      userCtx.login(data);

      const destination = data.role === 'admin' ? "/admin" : "/checkout/step1";
      navigate(destination);
    }
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  
  }

  return (
    <section className="max-w-4xl mx-auto mt-16 flex flex-col justify-center items-center shadow-2xl">
      <div className="flex flex-col items-center m-5 mt-20 max-w-3xl mx-auto gap-4 sm:flex-row">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl font-bold ">Sign in to stunna eyewear</h1>
          <label className=" text-slate-600 text-sm">email</label>
          <input
            type="email"
            id="email"
            placeholder="test@example.com"
            className="p-2 border rounded-lg"
            required
            onChange={handleChange}
          />
          <label className=" text-slate-600 text-sm">password</label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            className="p-2 border rounded-lg"
            required
            onChange={handleChange}
          />
          <div className="text-sm flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/forget-password"
              className="hover:cursor-pointer underline"
            >
              forget password
            </Link>
            <button disabled={status === "pending"} className="w-full sm:w-fit border rounded-lg bg-slate-800 text-white p-2 text-center ">
              {status === "pending" ? "loading.." :"Sign in"}
            </button>
          </div>
          {isError && <p className="text-red-500">{error.info?.message}</p>}
        </form>
        <div>
          <p className="text-sm">OR</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link className="bg-[#0077FC] flex items-center p-2 border rounded-lg gap-4 w-full">
            <IoLogoFacebook />
            <p>Continue with Facebook</p>
          </Link>
          <Link className="flex items-center gap-4 border rounded-lg p-2 bg-[#FFFFFF]">
            <FaGoogle />
            <p>Continue with Google</p>
          </Link>
          <Link className="flex items-center gap-4 border rounded-lg p-2 bg-[#24292E] text-white">
            <BsGithub />
            <p>Continue with Github</p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center p-3 gap-5 w-full mt-0">
        <p>Already have an account</p>
        <Link to="/sign-up" className=" p-2 hover:bg-black hover:text-white">
          Sign Up
        </Link>
      </div>
    </section>
  );
}

export default SignIn;
