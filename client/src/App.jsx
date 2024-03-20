
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import {
  Home, Shop, About, SignIn, SignUp, ForgetPassword,
  Product, CheckOut, SuccessPayment, Profile, NotFound,Search, Phones, Samsung, Iphone, Laptops, Hp, Macbook
} from "./pages";
import {AdminHome, CreateItem, EditItem,DeleteItem,AdminDashboard, Products, Orders} from  './pages/admin'

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import EditAccount from "./components/EditAccount.jsx";
import MyOrders from "./components/MyOrders.jsx";
import WishList from "./components/WishList.jsx";
import RootLayout from "./components/RootLayout.jsx";
import AdminRootLayout from "./pages/admin/AdminRootLayout.jsx";
import Customers from "./pages/admin/Customers.jsx";
import Account from "./pages/admin/Account.jsx";
import EditAdminAccount from "./components/admin/EditAdminAccount.jsx";



const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/phones" element={<Phones />} />
      <Route path="/phones/iphone" element={<Iphone />} />
      <Route path="/phones/samsung" element={<Samsung />} />
      <Route path="/laptops" element={<Laptops />} />
      <Route path="/laptops/hp" element={<Hp />} />
      <Route path="/laptops/macbook" element={<Macbook />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit-account" element={<EditAccount />} />
        <Route path="/profile/my-orders" element={<MyOrders />} />
        <Route path="/profile/wish-list" element={<WishList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/payment-success" element={<SuccessPayment />} />
      </Route>
    </Route>
    <Route element={<AdminRootLayout />}>
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/products/create-product" element={<CreateItem />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route
        path="/admin/products/delete/:productId"
        element={<DeleteItem />}
      />
      <Route path="/admin/products/edit/:productId" element={<EditItem />} />
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/edit-account" element={<EditAdminAccount />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </Route>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/sign-up",
//         element: <SignUp />,
//       },
//       {
//         path: "/sign-in",
//         element: <SignIn />,
//       },
//       {
//         path: "/forget-password",
//         element: <ForgetPassword />,
//       },
//       {
//         path: "/featured",
//         element: <Featured />,
//       },
//       {
//         path: "/recommended",
//         element: <Recommended />,
//       },
//       {
//         path: "/shop",
//         element: <Shop />,
//       },
//       {
//         path: "/product/:productId",
//         element: <Product />,
//       },
//       {
//         element: <ProtectedRoutes />,
//         children: [
//           {
//             path: "/profile",
//             element: <Profile />,
//           },
//           { path: "/profile/edit-account", element: <EditAccount /> },
//           { path: "/profile/my-orders", element: <MyOrders /> },
//           { path: "/profile/wish-list", element: <WishList /> },
//           {
//             path: "checkout/step1",
//             element: <CheckOut />,
//           },
//           { path: "checkout/step2", element: <Order /> },
//           { path: "checkout/step3", element: <Payment /> },
//         ],
//       },
//     ],
//   },

//   {
//     element: <AdminRootLayout />,
//     children: [
//       {
//         path: "/admin",
//         element: <AdminHome />,
//         children: [
//           { path: "/admin/dashboard", element: <AdminDashboard /> },
//           {path: "/admin/products", element: <Products/>},
//           { path: "/admin/products/create-product", element: <CreateItem /> },
//           { path: "/admin/products/delete/:productId", element: <DeleteItem /> },
//           { path: "/admin/products/edit/:productId", element: <EditItem /> },
//         ],
//       },
//     ],
//   },
// ]);


const router = createBrowserRouter(routeDefinitions);

function App() {
  return (
     <RouterProvider router={router}/>
  );
}

export default App;
