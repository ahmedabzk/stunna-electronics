import { useQuery } from "@tanstack/react-query";

import Footer from "../components/Footer";
import { fetchData } from "../utils/http";
import Card from "../components/Card";
import { Link } from "react-router-dom";

function Home() {
  const featuredItems = useQuery({
    queryKey: ["featured"],
    queryFn: () => fetchData("featured"),
  });

  const recommendedItems = useQuery({
    queryKey: ["recommended"],
    queryFn: () => fetchData("recommended")
  });

  if (featuredItems.isPending && recommendedItems.isPending) {
    return <p className="text-center">Loading Products ...</p>;
  }
  if (featuredItems.isError && recommendedItems.isError) {
    return (
      <>
        <p>{featuredItems.error.message}</p>
        <p>{recommendedItems.error.message}</p>
      </>
    );
  }

  return (
    <section className="mt-12 max-w-[1600px] mx-auto flex flex-col items-center md:items-start gap-12">
      <div className="bg-[#F3F3F3] w-full flex flex-col md:flex-row items-center gap-4 shadow-lg">
        <div className="ml-5 flex flex-col gap-4">
          <h1 className="text-xl">
            <span className="font-bold">See</span> everything with{" "}
            <span className="font-bold">Clarity</span>
          </h1>
          <p className="">
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts we&apos;ve got
            your eyes covered.
          </p>
          <Link
            to="/shop"
            className="bg-black text-white border rounded-sm p-3 w-fit hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
        <img src="https://media.istockphoto.com/id/1406233756/photo/smiling-young-woman-choosing-eyeglasses-in-optical-store.jpg?s=612x612&w=0&k=20&c=bPuslHvx5Mlnk3uvw9u9i2zjeMorGp9LVu7pOKxWMtA=" />
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Featured Products</h1>
          <Link to="/featured" className="underline">
            See All
          </Link>
        </div>
        {/* <Card data={featuredItems.data} /> */}
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Recommended Products</h1>
          <Link to="/recommended" className="underline">
            See All
          </Link>
        </div>
        {/* <Card data={recommendedItems.data} /> */}
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default Home;
