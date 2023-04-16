import styled  from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@material-ui/icons";


const Container = styled.div``;

const Wrapper = styled.div`
   padding: 20px;
`;

const Title = styled.h1`
   font-weight: 300;
   text-allign: center;
`;

const Top = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 20px;
`;

const TopButton= styled.button`
   padding: 10px;
   font-weight: 600;
   cursor: pointer;
   border: ${(props) => props.type === "filled" && "none"};
   background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
   color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-betwwen;
`;

const Info = styled.div`
    flex:3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProductDetail = styled.div`
    flex:2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display:flex;
    flex-direction: column;
    justify-content: space-around;

`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props)=>props.color}
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
     font-size: 24px;
     margin: 5px;

`;
const ProductPrice = styled.div`
     font-size: 30px;
     font-weight: 200;  
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex:1;
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
    font-weight: ${(props)=>props.type === "total" && "500"}
    font-size: ${(props)=>props.type === "total" && "24px"}
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600:
`;


const Cart = () => {
    return(
        <Container>
           <Navbar/>
           <Wrapper>
            <Title>Giỏ Hàng </Title>
            <Top>
                <TopButton>Tiếp tục mua sắm</TopButton>
                <TopTexts>
                    <TopText>Giỏ hàng(2)</TopText>
                    <TopText>Danh sách yêu thích(0)</TopText>
                </TopTexts>
                <TopButton type="filled">Thanh toán</TopButton>
            </Top>
            <Bottom>
                <Info>
                    <Product>
                        <ProductDetail>
                            <Image scr=""/>
                            <Details>
                                <ProductName><b>Product:</b> JESSIE THUNDER SHOES</ProductName>
                                <ProductId><b>ID:</b> 93813718293</ProductId>
                                <ProductColor color="black"/>
                                <ProductSize><b>Size:</b> 37.5</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                               <Add/>
                               <ProductAmount>2</ProductAmount>
                               <Remove/> 
                            </ProductAmountContainer>
                            <ProductPrice>500.000 VNĐ</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    <Product>
                        <ProductDetail>
                            <Image scr=""/>
                            <Details>
                                <ProductName><b>Product:</b> HAKURA T-SHIRT</ProductName>
                                <ProductId><b>ID:</b> 93813718235</ProductId>
                                <ProductColor color="gray"/>
                                <ProductSize><b>Size:</b> M</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                               <Add/>
                               <ProductAmount>1</ProductAmount>
                               <Remove/> 
                            </ProductAmountContainer>
                            <ProductPrice>200.000 VNĐ</ProductPrice>
                        </PriceDetail>
                    </Product>
                </Info>
                <Summary>
                    <SummaryTitle>Thông tin thanh toán</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Thành tiền</SummaryItemText>
                        <SummaryItemPrice>$ 80</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Phí vận chuyển</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Giảm giá vận chuyển</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>    
                    <SummaryItem type="total">
                        <SummaryItemText>Tổng số tiền</SummaryItemText>
                        <SummaryItemPrice>$ 80</SummaryItemPrice>
                    </SummaryItem>
                    <Button>THANH TOÁN</Button>
                </Summary>    
            </Bottom>
           </Wrapper>
           <Footer/>
        </Container>
    );
};

export default Cart
