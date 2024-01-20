import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http.js";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";

import Card from "../components/Card.jsx";
import CartContext from "../context/CartContext.jsx";


function Item() {
  const cartCtx = useContext(CartContext);

  const params = useParams();
  const productId = params.productId;

  const productById = useQuery({
    queryKey: [productId],
    queryFn: () => fetchData(productId),
  });

  const recommendedProducts = useQuery({
    queryKey: ["recommended"],
    queryFn: () => fetchData("recommended"),
  });

  if (productById.isPending) {
    return <p>Loading item...</p>;
  }
  if (recommendedProducts.isPending) {
    return <p>Loading recommended products...</p>;
  }

  return (
    <section className="mt-12 mb-12 flex flex-col items-center md:items-start max-w-[1200px] mx-auto gap-12">
      <div className="flex flex-col gap-4 items-center md:items-start w-[500px] md:w-[800px] ">
        <Link to="/shop" className="flex gap-2 items-center">
          <FaArrowLeft />
          Back to shop
        </Link>
        <div className="border border-slate-300 flex flex-col gap-4 md:flex-row">
          <img
            src={productById.data.images[0]}
            className="md:w-[400px]  bg-[#F3F3F3] object-contain"
          />
          <button className="flex flex-row md:flex-col">
            {productById.data.images.length > 0 &&
              productById.data.images.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="images"
                  className="border border-slate-300 w-[80px] md:w-[250px] md:h-[80px] object-contain"
                />
              ))}
          </button>
          <div className="  border border-slate-400 ">
            <div className="ml-4 flex flex-col gap-6 items-start">
              <p className="text-slate-500 text-sm">{productById.data.brand}</p>
              <h2 className="font-bold">{productById.data.name}</h2>
              <h3 className="text-sm ">{productById.data.description}</h3>
              <p className="text-slate-400 text-sm">
                Lens Width and Frame Size
              </p>
              <select className="p-2 border border-blue-500 rounded-lg w-full">
                <option>28mm</option>
                <option>36mm</option>
                <option>42mm</option>
              </select>
              <div className="flex gap-4">
                {productById.data.colors.length > 0 &&
                  productById.data.colors.map((color) => (
                    <button key={color} style={{backgroundColor: color, width: '14px', height: '14px', borderRadius: '50%'}}>
                      
                    </button>
                  ))}
              </div>
              <p>{productById.data.price}</p>
              <button onClick={() => cartCtx.addToCart(productById.data)} className="p-3 rounded-sm bg-black text-white w-fit mb-4">
                Add To Basket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Recommended Products</h1>
          <Link to="/recommended" className="underline">
            See All
          </Link>
        </div>
        <Card data={recommendedProducts.data} />
      </div>
    </section>
  );
}

export default Item;
