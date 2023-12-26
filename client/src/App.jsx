import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import { Home, Shop, Recommended, Featured, SignIn, SignUp, ForgetPassword} from "./pages";
import Footer from "./components/Footer.jsx";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
      </Routes>
    </>
  );
}

export default App;
