import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import logo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: auto;
  height: 230px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: #000;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>VIE</Language>
          <SearchContainer>
            <Input placeholder="Tìm kiếm..." />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo></Logo>
          </Link>
        </Center>
        <Right>
          {!user?.currentUser?.accessToken ? (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem>LOGIN</MenuItem>
              </Link>
            </>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleLogout}
            >
              LOGOUT
            </Link>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge
                overlap="rectangular"
                badgeContent={quantity}
                color="primary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
