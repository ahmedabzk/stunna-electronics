import { useQuery } from "@tanstack/react-query";
import { fetchProductsByBrand } from "../utils/http";

import Card from "../components/Card";
import Loader from "../components/Loader";

const Hp = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["hp"],
    queryFn: () => fetchProductsByBrand("hp"),
  });

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <p>{error.info?.message}</p>;
  }

  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full mt-6">
      <h1>Hp Laptops</h1>
      <Card data={data} />
    </div>
  );
};

export default Hp;
