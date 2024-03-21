
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { useContext } from "react";

const server_url = import.meta.env.VITE_SERVER_URL;

const PayButton = ({ cartItems,handleClear }) => {
    const userCtx = useContext(UserContext);
  
  const handleCheckout = () => {
    axios
        .post(`${server_url}/api/v1/stripe/create-checkout-session`, {
            cartItems,
            userId: userCtx.current_user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => { handleCheckout() }}>Check out</button>
    </>
  );
};

export default PayButton;
