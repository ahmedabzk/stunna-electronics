import { Routes, Route } from "react-router-dom";


import Header from "./components/Header.jsx";
import { Home, Shop, Recommended, Featured, SignIn, SignUp, ForgetPassword, Order, Product, CheckOut, Payment, Profile } from "./pages";

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/checkout/step1" element={<CheckOut />} />
          <Route path="/checkout/step2" element={<Order />} />
          <Route path="/checkout/step3" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
