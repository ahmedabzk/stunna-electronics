import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <div className="flex justify-center items-start gap-5 flex-wrap h-auto">
      {data &&
        data.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow w-[20rem]"
          >
            <img
              src={product.images}
              className="rounded-t-lg h-[8rem] object-contain"
            />
            <div className="p-4">
              <h2 className="mb-1 text-xl font-semibold tracking-tight text-gray-900">
                {product.name}
              </h2>
              <p className="mb-1 font-normal tracking-tight text-gray-600 line-clamp-3">
                {product.description}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                learn more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Card
