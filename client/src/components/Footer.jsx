import { PiEyeglassesBold } from "react-icons/pi";

function Footer() {
  return (
    <footer className="fixed left-0 bottom-0 w-full bg-[#F0F0F0]">
      <p className="">
        Developed by <span className="underline">Ahmed Hassan</span>
      </p>
      <div className="flex flex-col items-center">
        <PiEyeglassesBold className="w-16 h-16" />
        <div>
          <h1 className="font-semibold uppercase">stunna</h1>
          <span className="font-thin text-black">eyewear</span>
        </div>
      </div>
      <p className="text-right m-4">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
