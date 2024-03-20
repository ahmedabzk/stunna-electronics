import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllProducts } from "../../utils/http";
import Loader from "../../components/Loader";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
  },
  {
    field: "brand",
    headerName: "Brand",
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Description",
    headerAlign: "center",
    width: 400,
  },
  {
    field: "maxQuantity",
    headerName: "Remaining in stock",
    //  width: 200,
  },
  {
    field: "colors",
    headerName: "Available Colors",
    width: 200,
    // headerAlign: "center",
  },
  {
    field: "storage",
    headerName: "Storage",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Actions",
    //  width: 200,
    renderCell: (params) => (
      <div className="flex gap-2">
        <Link to={`/admin/products/edit/${params.id}`}>
          <button>Edit</button>
        </Link>

        <Link to={`/admin/products/delete/${params.id}`}>
          <DeleteIcon />
        </Link>
      </div>
    ),
  },
];

function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <Loader/>;
  }
  if (isError) {
    return <p>{error.info?.message}</p>;
  }

  return (
    <div className="w-[85%] h-full flex flex-col">
      <h1 className="text-center mt-2 text-slate-500 font-semibold">
        Products
      </h1>
      <div className="mt-4">
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          slots={{ toolbar: GridToolbar }}
          showCellVerticalBorder={true}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "darkcyan",
            "& .MuiDataGrid-cell:hover": {
              color: "firebrick",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Products;
