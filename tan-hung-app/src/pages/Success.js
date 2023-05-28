import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const { state } = location;
  const data = state.stripeData;
  const cart = state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/orders",
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: 500,
            address: "Ha Noi",
          },
          {
            headers: {
              token: `Bearer ${currentUser.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
