import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http.js";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ImageGallery from "react-image-gallery";
import { FaArrowLeft } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";

import CartContext from "../context/CartContext.jsx";
import { formatter } from "../utils/formatter.js";
import Loader from "../components/Loader.jsx";

function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("");
  const [size, setSize] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const cartCtx = useContext(CartContext);
  const params = useParams();

  const productId = params.productId;

  const productById = useQuery({
    queryKey: [productId],
    queryFn: () => fetchData(productId),
  });


  useEffect(() => {
    let image = [];
    productById.data?.images.map((url) => {
      image.push({ original: url, thumbnail: url });
    });

    setImageUrl(image);
  }, [productById.data]);

  if (productById.isPending) {
    return <Loader/>;
  }

  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  return (
    <section className="mt-12 mb-12 flex flex-col items-center md:items-start max-w-[1200px] mx-auto gap-12">
      <div className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4">
          <ImageGallery
            items={imageUrl}
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            //   autoPlay={true}
          />
        </div>

        {/* description  */}

        <div className="px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">
            {productById.data?.title}
          </h2>

          <p className="mt-5 font-bold">
            Availability:{" "}
            {productById.data?.maxQuantity > 0 ? (
              <span className="text-green-600">In Stock </span>
            ) : (
              <span className="text-red-600">Out Of Stock</span>
            )}
          </p>
          <p className="font-bold">
            Brand:{" "}
            <span className="font-normal">{productById.data?.brand}</span>
          </p>
          <p className="font-bold">
            Category:{" "}
            <span className="font-normal">{productById.data?.category}</span>
          </p>

          <p className="mt-4 text-4xl font-bold text-violet-900">
            {formatter.format(productById.data?.price)}
            {/* <span className="text-xs text-gray-400 line-through">
              ${productDetailItem.previousPrice}
            </span> */}
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {productById.data?.description}
          </p>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Colors</p>
            <div className="flex gap-1">
              {productById.data?.colors.map((color, index) => {
                return (
                  <button
                    key={index}
                    className={`cursor-pointer border border-white focus:ring-2 active:ring-2`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Storage</p>
            <div className="flex gap-1">
              {productById.data?.storage.map((size, index) => {
                return (
                  <button
                    key={index}
                    className="flex cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                    onClick={() => setSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-7 flex flex-row items-center gap-6">
            <button
              onClick={() =>
                cartCtx.addToCart(productById.data, selectedColor, size)
              }
              className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
            >
              <BiShoppingBag className="mx-2" />
              Add to cart
            </button>
            <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <AiOutlineHeart className="mx-2" />
              Wishlist
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* <div className="flex justify-between">
          <h1 className="text-xl font-bold">Recommended Products</h1>

          <Link to="/recommended" className="underline">
            See All
          </Link>
        </div> */}
        {/* <Card data={recommendedProducts.data} /> */}
      </div>
    </section>
  );
}
export default ProductDetails;
