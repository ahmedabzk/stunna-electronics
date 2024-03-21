
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { formatter } from "../utils/formatter";
import Loader from "../components/Loader";

const server_url = import.meta.env.VITE_SERVER_URL;

function Shop() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchListings = async (page) => {
    setLoading(true);
    const res = await fetch(
      `${server_url}/api/v1/product/get/all?page=${page}&pageSize=10`
    );
    const data = await res.json();
    const { products, totalPages } = data;
    setListings(products);
    setTotalPages(totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const onShowMoreClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="mt-8 md:max-w-[1800px] mx-auto flex flex-col gap-8 items-center -z-30">
      
      <div className="flex justify-center items-start gap-5 flex-wrap h-auto">
        {!loading &&
          listings &&
          listings.map((product) => (
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
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={onShowMoreClick}
        className="bg-black text-white w-fit p-2 rounded-md mb-3 transition-all hover:bg-slate-700"
      >
        {currentPage !== totalPages ? "Load more" : "Nothing more to load"}
      </button>
    </section>
  );
}

export default Shop;
