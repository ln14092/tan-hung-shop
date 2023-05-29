import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/logo.png";
import { clearCart, removeProduct } from "../redux/cartRedux";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 18px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const ProductQuantity = styled.span`
  font-size: 18px;
  font-weight: 200;
  display: flex;
  align-items: center;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);

  const history = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // let products = cart.products.map((product) => ({
        //   productId: product._id,
        //   quantity: product.quantity,
        // }));
        let total = cart.total;
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            // products,
            // userId: user.currentUser._id,
            // address: "Ha Noi",
            tokenId: stripeToken.id,
            amount: 300,
          },
          {
            headers: {
              Authorization: `Bearer sk_test_51N6m5wIA8uAoJj038VzImUDQNzyXQcmIdqf8SbTkBnfBvwWy65CWJI4zA6UKrEUKZbaUovde0DB8Y8vrNV4oWMic002T5a72Tq`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(clearCart());
        const data = { stripeData: res.data, cart: cart };
        history("/success", {
          state: data,
        });
      } catch {
        alert("Thanh toán không thành công");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history, dispatch]);

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
                padding: "12px",
              }}
            >
              CONTINUE SHOPPING
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.length > 0 ? (
              cart.products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      {/* <Remove onClick={() => handleIncrea(product.quantity)} /> */}

                      {/* <Add onClick={() => handleDecrea(product.quantity)} /> */}
                      <ProductQuantity>
                        <b style={{ display: "inline-block" }}>Quantity:</b>{" "}
                        <ProductAmount>{product.quantity}</ProductAmount>
                      </ProductQuantity>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "4px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveProduct(product)}
                      >
                        Remove
                      </div>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <h1
                style={{
                  fontSize: "18px",
                  padding: "20px",
                }}
              >
                Chưa có sản phẩm nào được thêm vào giỏ hàng ...
              </h1>
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total ?? 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total ?? 0}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Tân Hưng Shop"
              image={logo}
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              allowRememberMe
              stripeKey="pk_test_51N6m5wIA8uAoJj03gvrG8m1Ik17LwxAaJr2IKPXYZG9YRUbQK5mChvY7tFAO5wJluiAaBiRcPjqr6LmDdoKWuKhd003BsRyEVK"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
