import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";

function Search() {
   const location = useLocation();
   const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("searchTerm") || "";
   const schQuery = searchQuery.toString();

  const fetchSearchedData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/product/get/search?searchTerm=${schQuery}`
    );

    if (!res.ok) {
      const error = new Error("failed to create user");
      error.code = res.statusCode;
      error.info = await res.json();
      throw error;
    }
    const products = await res.json();
    return products;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchSearchedData,
    enabled: false,
  });

  useEffect(() => {
    // Fetch data when searchTerm changes
    refetch();
  }, [searchQuery, refetch]);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError) {
    return <p>{error.info?.message}</p>;
  }


  return (
    <div>
      <h1 className="ml-6 mt-2 text-slate-600 uppercase font-semibold">
        results:
      </h1>
      {!isLoading && data?.length === 0 && (
        <p className="text-xl text-slate-700">No product found!</p>
      )}
      <Card data={data} />
    </div>
  );
}

export default Search;
