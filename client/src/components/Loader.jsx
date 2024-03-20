import Spinner from '../assets/infinite-spinner.svg';

const Loader = () => {
  return (
    <div className="fixed h-[60%] flex flex-col justify-center items-center  z-10 inset-0">
      <img
        src={Spinner}
        alt="infinite spinner"
        className="w-[200px] h-[200px] object-contain"
      />
    </div>
  );
}

export default Loader
