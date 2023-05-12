import StripeCheckout from "react-stripe-checkout";
import logo from "../images/logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "https://localhost:5000/api/checkout/payment",
          {
            tokenID: stripeToken,
            amount: 2000,
          }
        );
        console.log(res.data);
        navigate("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);
  const onToken = (token) => {
    console.log(token);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alightItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait ...</span>
      ) : (
        <StripeCheckout
          name="TanHungShop"
          image={logo}
          billingAddress
          shippingAddress
          description="Your total is 10$"
          amount={2000}
          token={onToken}
          stripeKey="pk_test_51N6m5wIA8uAoJj03gvrG8m1Ik17LwxAaJr2IKPXYZG9YRUbQK5mChvY7tFAO5wJluiAaBiRcPjqr6LmDdoKWuKhd003BsRyEVK"
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
