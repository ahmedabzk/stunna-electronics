
import { UserContext } from "../context/UserContext";
import axios from "axios";

import { useContext } from "react";


const PayButton = ({ cartItems,handleClose }) => {
    const userCtx = useContext(UserContext);
    console.log("payment: ",cartItems);
  const handleCheckout = () => {
    axios
        .post("http://localhost:3000/api/v1/stripe/create-checkout-session", {
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
      <button onClick={() => {handleCheckout()}}>Check out</button>
    </>
  );
};

export default PayButton;
