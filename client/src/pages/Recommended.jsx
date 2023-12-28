import { useQuery } from "@tanstack/react-query";

import Card from "../components/Card.jsx";
import { fetchData } from "../utils/http.js";
import Footer from "../components/Footer.jsx";

function Recommended() {
  const {data, isPending, isError, error} =useQuery({
    queryKey: ['recommended'],
    queryFn: () => fetchData("recommended")
  });

  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <section className="mt-12 max-w-[1600px] mx-auto flex flex-col items-center md:items-start gap-4">
      <div className="w-full bg-[#F3F3F3] flex justify-between items-center">
        <h1 className="ml-7 font-bold text-xl">Recommended Products</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmxeRNkwwwJeuMzq6LXg59ExSTXUX8kXfV46m0z4pemgF3sXJqPJoeeWnVohZ26bIyM1Y&usqp=CAU" />
      </div>
      <Card data={data} />
      
    </section>
  );
}

export default Recommended