import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { formatter } from "../utils/formatter";


const fetchProducts = async ({ pageParam = 10 }) => {
  const res = await fetch(
    `http://localhost:3000/api/v1/product/get/all?limit=${pageParam}`
  );
  const data = res.json();
  return data;
};



function Shop() {
  // const { ref, inView } = useInView();

  


  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
      initialPageParam: 10,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });


  //  useEffect(() => {
  //    if (inView && hasNextPage) {
  //      console.log("Fire!");
  //      fetchNextPage();
  //    }
  //  }, [inView, hasNextPage, fetchNextPage]);

   if (status === "pending") {
     return <p>Loading...</p>;
   }

   if (status === "error") {
     return <p>Error: {error.message}</p>;
   }
  


  return (
    <section className="mt-8 md:max-w-[1800px] mx-auto flex flex-col gap-8 items-center -z-30">
      <div className="flex justify-center items-start gap-5 flex-wrap h-auto">
        {data?.pages.map((products) =>
          products.map((product) => (
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
          ))
        )}
      </div>

      <button
        // ref={ref}
        className="bg-black text-white w-fit p-2 rounded-md mb-3 transition-all hover:bg-slate-700"
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </section>
  );
}

export default Shop;
