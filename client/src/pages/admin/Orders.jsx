import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";


//    userId: { type: String, required: true },
  //   products: [
  //     {
  //       productId: { type: String },
  //       quantity: { type: Number, default: 1 },
  //       name: { type: String, required: true },
  //       brand: { type: String, required: true },
  //       price: { type: Number, required: true },
  //       color: { type: String, required: true },
  //       image: { type: String, required: true },
  //     },
  //   ],
  //   amountPaid: { type: Number, required: true },
  //   shipping: { type: Object, required: true },
  //   delivery_status: { type: String, default: "pending" },
  //   payment_status: { type: String, required: true },
  // },


const orders = [
  {
    field: "_id",
    headerName: "ID",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "userId",
    headerName: "user id",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "productId",
    headerName: "Products",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "amountPaid",
    headerName: "amountPaid",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "shipping",
    headerName: "shipping",
    headerAlign: "center",
    width: 200,
  },
  {
    field: "delivery_status",
    headerName: "delivery status",
    width: 200,
    headerAlign: "center",
  },
  {
    field: "payment_status",
    headerName: "payment status",
    width: 200,
    headerAlign: "center",
  },
];


function Orders() {
    // const [orderData, setOrderData] = useState([]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/v1/admin/orders/all");
            if (!res.ok) {
                const error = new Error("failed to update user profile");
                error.code = res.statusCode;
                error.info = await res.json();
                throw error;
            }
            
            const data = res.json();
            return data;
        }
    });
  
     if (isLoading) {
       return <Loader/>;
     }

     if (isError) {
       return <p>{error.info?.message}</p>;
     }
    console.log(data);
    return (
      <div className="w-[70%] h-full flex flex-col">
        <h1 className="text-center mt-2 text-slate-500 font-semibold">Users</h1>
        <div className="mt-4">
          <DataGrid
            rows={data}
            columns={orders}
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

export default Orders