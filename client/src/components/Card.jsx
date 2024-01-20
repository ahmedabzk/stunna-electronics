import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <div className="flex flex-col gap-5 flex-wrap sm:flex-row h-auto">
      {data && data.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="flex flex-col items-center border border-slate-300 w-[300px] h-[250px] gap-2 hover:cursor-pointer object-contain shadow-md"
          >
            <img
              src={product.images}
              className="bg-[#F3F3F3] hover:scale-105 object-contain"
            />
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm text-slate-500">{product.brand}</p>
          </Link>
        ))}
    </div>
  );
}

export default Card