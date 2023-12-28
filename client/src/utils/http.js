
export const fetchData = async(url) => {
  const res = await fetch(`http://localhost:3000/api/v1/item/get/${url}`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    return error;
  }

  const items = await res.json();
  // console.log(items);

  return items;
}