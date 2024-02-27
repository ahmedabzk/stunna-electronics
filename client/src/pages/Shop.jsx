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
    <section className="mt-8 md:max-w-[1800px] mx-auto flex flex-col gap-8 items-center -z-30">
      <div className="flex justify-center items-start gap-5 flex-wrap h-auto">
        {data.map((product) => (
          <div
            key={product._id}
            className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row"
          >
            <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
              <img
                src={product.images}
                alt="product image"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h1 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                {product.name}
              </h1>
              <h4 className="line-clamp-4 mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {product.description}
              </h4>
              <p className="mb-8 font-sans text-base antialiased font-normal leading-relaxed text-blue-500">
                {formatter.format(product.price)}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              >
                Quick View
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
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


{/* <div class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
  <div class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
      alt="card-image"
      class="object-cover w-full h-full"
    />
  </div>
  <div class="p-6">
    <h6 class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
      startups
    </h6>
    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Lyft launching cross-platform service this week
    </h4>
    <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
      Like so many organizations these days, Autodesk is a company in
      transition. It was until recently a traditional boxed software company
      selling licenses. Yet its own business model disruption is only part of
      the story
    </p>
    <a href="#" class="inline-block">
      <button
        class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button"
      >
        Learn More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          ></path>
        </svg>
      </button>
    </a>
  </div>
</div>;   */}