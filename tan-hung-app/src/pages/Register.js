import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 17px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = { username, email, password };
    register(dispatch, data, navigate);
  };

  return (
    <Container>
      <Wrapper>
        <Title>TẠO TÀI KHOẢN</Title>
        <Form>
          {/* <Input placeholder="" /> */}
          {/* <Input placeholder="Họ" /> */}
          <Input
            placeholder="Tên người dùng"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Input placeholder="Xác nhận mật khẩu" /> */}
          <Agreement>
            Để tạo tài khoản mới bạn vui lòng đồng ý với các chính sách dữ liệu
            các nhân của chúng tôi <b>Chính sách bảo mật</b>
          </Agreement>
          <Button onClick={handleRegister}>TẠO</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
