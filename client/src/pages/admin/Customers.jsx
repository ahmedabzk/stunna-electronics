import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchAllUsers } from "../../utils/http";
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
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerAlign: "center",
    textAlign: "center",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    headerAlign: "center",
  },
];

function Customers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  if (isLoading) {
    return <Loader/>;
  }
  if (isError) {
    return <p>{error.info?.message}</p>;
  }

  return (
    <div className="w-[70%] h-full flex flex-col">
      <h1 className="text-center mt-2 text-slate-500 font-semibold">Users</h1>
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

export default Customers;
