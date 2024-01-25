import { useMutation } from "@tanstack/react-query";
import { useParams,Link,useNavigate } from "react-router-dom";
import { queryClient, deleteProduct } from "../../utils/http";

function DeleteItem() {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isError, error, isPending,data,isSuccess } = useMutation({
    mutationKey: ['products'],
    mutationFn: () => deleteProduct(params.productId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        navigate('/admin/products');
      }, 1000)
    }
  });

  const handleDelete = () => {
    mutate();
  }

  if (isError) {
    return <p>{error.info?.message}</p>
  }


  return (
    <div className="w-full h-[70%] flex flex-col items-center justify-around">
      <p>Are you sure you want to delete this product</p>
      <div className="w-[60%] flex items-center justify-around">
        <Link
          to="/admin/products"
          className="text-center border rounded p-3 bg-slate-100 w-[20%] hover:bg-slate-300"
        >
          Cancel
        </Link>
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="border rounded p-3 bg-slate-800 text-white w-[20%] hover:shadow-lg"
        >
          Delete
        </button>
      </div>
      {isSuccess && <p className="text-green-500 text-center">{data}</p>}
    </div>
  );
}

export default DeleteItem