import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import { Link } from "react-router-dom";

function Featured() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["featured"],
    queryFn: () => fetchData("featured/?feature=true"),
  });

  return (
    <section className="mt-12 max-w-7xl mx-auto flex flex-col items-center gap-6">
      <div className="bg-[#F3F3F3] w-full">
        <div className="flex items-center justify-between ml-7">
          <h1 className="text-2xl font-bold">Featured Products</h1>
          <img
            src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/733396/2.jpg?2688"
            className="w-[300px] h-[250px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 flex-wrap sm:flex-row">
        {data && data.map((item, index) => (
          <Link
            to=""
              key={index}
              className="flex flex-col items-center border border-slate-300 w-[300px] h-[250px] gap-2 hover:cursor-pointer"
            >
              <img src={item.images} className="bg-[#F3F3F3] hover:scale-105" />
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-sm text-slate-500">{item.brand}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default Featured;
