import { Link,useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { register } from "../utils/http";



function SignUp() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();



  const {mutate, isError,status, error} = useMutation({
    mutationFn: register,
    mutationKey: ['user'],
    onSuccess: () => {
      navigate('/sign-in');
    }
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData)
  }
  
  const disableButton = formData.name === '' || formData.email === '' || formData.password === '';

  return (
    <section className="max-w-4xl mx-auto mt-16 flex flex-col justify-center items-center shadow-2xl">
      <div className="flex flex-col items-center m-5 mt-20 max-w-3xl mx-auto gap-4 sm:flex-row">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-slate-500">
            Sign up to stunna eyewear
          </h1>
          <label className=" text-slate-600 text-sm">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Ahmed Hassan"
            className="p-2 border rounded-lg w-full" 
            required
            onChange={handleOnChange}
          />
          <label className=" text-slate-600 text-sm">email</label>
          <input
            type="email"
            id="email"
            placeholder="test@example.com"
            className="p-2 border rounded-lg"
            required
            onChange={handleOnChange}
          />
          <label className=" text-slate-600 text-sm">password</label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            className="p-2 border rounded-lg"
            required
            onChange={handleOnChange}
          />
          {/* <label className=" text-slate-600 text-sm">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Your password"
            className="p-2 border rounded-lg"
            onChange={handleOnChange}
          /> */}
          <button
          disabled={status === "pending" || disableButton}
            className="w-full border rounded-lg bg-slate-800 text-white p-2 text-center disabled:cursor-not-allowed"
          >
            {status ==="pending" ? "loading...":"Sign Up"}
          </button>
          {isError && <p className="text-red-400">{error.info?.message}</p>}
        </form>
        <div>
          <p className="text-sm font-semibold text-slate-400">OR</p>
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
        <Link to="/sign-in" className=" p-2 hover:bg-black hover:text-white">
          Sign In
        </Link>
      </div>
    </section>
  );
}

export default SignUp;
