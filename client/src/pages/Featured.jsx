import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import { Link } from "react-router-dom";

import Card from "../components/Card.jsx";

function Featured() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["featured"],
    queryFn: () => fetchData("featured"),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <section className="mt-12 max-w-[1600px] mx-auto flex flex-col items-center md:items-start gap-6">
      <div className="bg-[#F3F3F3] w-full">
        <div className="flex items-center justify-between ml-7">
          <h1 className="text-2xl font-bold">Featured Products</h1>
          <img
            src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/733396/2.jpg?2688"
            className="w-[300px] h-[250px]"
          />
        </div>
      </div>
      <Card data={data} />
    </section>
  );
}

export default Featured;
