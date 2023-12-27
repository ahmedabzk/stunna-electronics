import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Header from "./components/Header.jsx";
import { Home, Shop, Recommended, Featured, SignIn, SignUp, ForgetPassword} from "./pages";
import Footer from "./components/Footer.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/featured" element={<Featured/>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
