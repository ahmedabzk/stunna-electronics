import { useQuery } from "@tanstack/react-query";
import { fetchProductsByBrand } from "../utils/http";

import Card from "../components/Card";
import Loader from "../components/Loader";

const Iphones = () => {

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ['iphone'],
        queryFn:() => fetchProductsByBrand("iphone")
    });


    if (isLoading) {
        return <Loader/>
    }

    if (isError) {
        return <p>{error.info?.message}</p>
    }

    return (
      <div className="flex flex-col items-center justify-center gap-6 w-full mt-6">
        <h1 className="text-2xl font-bold text-slate-700 shadow-md p-2 decoration-slate-400">iPhones</h1>
        <Card data={data}/>
      </div>
    );
    }


export default Iphones;