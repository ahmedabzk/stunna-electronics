import { useQuery } from "@tanstack/react-query";
import { useContext} from "react";
import { Link } from "react-router-dom";


import { formatter } from "../utils/formatter";

import CartContext from "../context/CartContext";


const fetchProducts = async (query) => {


   const res = await fetch(
     `http://localhost:3000/api/v1/product/get/all?limit=${query}`
   );
   const data = res.json();
   return data;
 };

function Shop() {
 
  const cartProduct = useContext(CartContext);
 

  let limit = 19;
 const {
   isPending,
   data,
   isError,
   error,
 } = useQuery({
   queryKey: ["products", limit],
   queryFn:() => fetchProducts(limit)
   
 });

  if (isPending) {
    return <p className="mt-7 text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="mt-7 text-center">{error.message}</p>;
  }



  const handleShowMore = () => {
    limit = 19;
  }


  return (
    <section className="mt-3 md:max-w-[1800px] mx-auto flex flex-col gap-8 items-center z-0">
      <div className="flex flex-col flex-wrap gap-2 md:flex-row items-center md:items-start">
        {data.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className=" flex flex-col border items-center gap-4 w-[200px] hover:cursor-pointer "
          >
            <img
              src={product.images}
              alt="product image"
              className="w-[200px] object-contain border  bg-[#F9F9F9]"
            />
            <h1 className="font-bold">{product.name}</h1>
            <h4 className="text-sm text-slate-400">{product.brand}</h4>
            <p>{formatter.format(product.price)}</p>
            <button
              onClick={() => cartProduct.addToCart(product)}
              className="bg-black text-white p-2 rounded-md mb-2 appearance-none hover:appearance-auto"
            >
              add to cart
            </button>
          </Link>
        ))}
      </div>

      <button
        onClick={handleShowMore}
        className="bg-black text-white w-fit p-2 rounded-md"
      >
        Show more Products
      </button>
    </section>
  );
}

export default Shop;
