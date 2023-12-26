

function ForgetPassword() {
  return (
    <div className="flex flex-col  mx-auto h-screen justify-center items-center gap-4">
      <h1>Forgot Your Password</h1>

      <form className="flex flex-col gap-4">
        <label>
          Enter your email address and we will send you a password reset email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          className="p-3 border rounded-lg w-full"
        />
        <button
          type="button"
          className="p-3 border rounded-lg bg-black text-white w-full sm:w-fit"
        >
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword