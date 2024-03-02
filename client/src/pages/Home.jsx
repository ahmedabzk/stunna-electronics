import { useQuery } from "@tanstack/react-query";


import { fetchProductsByBrandWithLimit } from "../utils/http";
import Card from "../components/Card";
import { Link } from "react-router-dom";

import Laptops from "../assets/laptop.webp";
import PhoneLogo from "../assets/phone.webp";


function Home() {
  const samsungProducts = useQuery({
    queryKey: ["samsung"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3000/api/v1/product/get/brand?brand=samsung"
      );
      if (!res.ok) {
        const error = new Error("failed to fetch different items");
        error.code = res.statusCode;
        error.info = await res.json();
        throw error;
      }

      const product = await res.json();
      return product;
    }
  });


  const iphoneProducts = useQuery({
    queryKey: ["iphone"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3000/api/v1/product/get/brand?brand=iphone"
      );
      if (!res.ok) {
        const error = new Error("failed to fetch different items");
        error.code = res.statusCode;
        error.info = await res.json();
        throw error;
      }

      const product = await res.json();
      console.log(product);
      return product;
    },
  });

  const macProducts = useQuery({
    queryKey: ["macbook"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3000/api/v1/product/get/brand?brand=macbook"
      );
      if (!res.ok) {
        const error = new Error("failed to fetch different items");
        error.code = res.statusCode;
        error.info = await res.json();
        throw error;
      }

      const product = await res.json();
      return product;
    },
  });

  const hpProducts = useQuery({
    queryKey: ["hp"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3000/api/v1/product/get/brand?brand=hp"
      );
      if (!res.ok) {
        const error = new Error("failed to fetch different items");
        error.code = res.statusCode;
        error.info = await res.json();
        throw error;
      }

      const product = await res.json();
      return product;
    },
  });

  if (samsungProducts.isPending && iphoneProducts.isPending && hpProducts.isPending && macProducts.isPending) {
    return <p className="text-center">Loading Products ...</p>;
  }
  if (samsungProducts.isError && iphoneProducts.isError && hpProducts.isError && macProducts.isError) {
    return (
      <>
        <p className="text-center">{samsungProducts.error.message}</p>
        <p className="text-center">{iphoneProducts.error.message}</p>
        <p className="text-center">{hpProducts.error.message}</p>
        <p className="text-center">{macProducts.error.message}</p>
      </>
    );
  }

  return (
    <section className="mt-12 max-w-[1600px] mx-auto flex flex-col items-center md:items-start gap-12">
      <div className="bg-[#F3F3F3] w-full flex flex-col md:flex-row items-center gap-4 shadow-lg">
        <img
          src={PhoneLogo}
          className="rounded-t-lg h-[20rem] w-1/3 object-contain"
        />
        <div className="ml-5 flex flex-col items-center gap-4 w-1/3 ">
          <h1 className="text-xl font-semibold text-blue-400 bg-clip-border">
            <span className="font-bold">Shop</span> from the number one trusted
            dealer in <span className="font-bold">Electronics</span>
          </h1>
          <p className="font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            Buying phones or computers should leave you happy and with money in
            your pocket. <strong>iphones</strong>,<strong>Samsung</strong>,
            <strong>Macbooks</strong>,<strong>Hp</strong> laptops we&apos;ve got
            your covered.
          </p>
          <Link
            to="/shop"
            className="bg-black text-white border rounded-sm p-3 w-fit hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
        <img
          src={Laptops}
          className="rounded-t-lg h-[20rem] w-1/3  object-contain "
        />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Samsung Products</h1>
          <Link to="/phones/samsung" className="underline">
            See All
          </Link>
        </div>
        <Card data={samsungProducts.data} />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Apple phones</h1>
          <Link to="/phones/iphone" className="underline">
            See All
          </Link>
        </div>
        <Card data={iphoneProducts.data} />
      </div>

      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Hp Laptops</h1>
          <Link to="/laptops/hp" className="underline">
            See All
          </Link>
        </div>
        <Card data={hpProducts.data} />
      </div>

      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Apple Laptops</h1>
          <Link to="/laptops/macbook" className="underline">
            See All
          </Link>
        </div>
        <Card data={macProducts.data} />
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default Home;
