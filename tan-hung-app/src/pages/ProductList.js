import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Title>Váy</Title>
      <FilterContainter>
        <Filter>
          <FilterText>Lọc sản phẩm: </FilterText>
          <Select>
            <Option disabled selected>
              Màu sắc
            </Option>
            <Option>Trắng</Option>
            <Option>Đen</Option>
            <Option>Đỏ</Option>
            <Option>Xanh</Option>
            <Option>Vàng</Option>
            <Option>Lục</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Kích thước
            </Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>S</Option>
            <Option>XS</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp sản phẩm: </FilterText>
          <Select>
            <Option selected>Sản phẩm mới nhất</Option>
            <Option>Giá tăng dần</Option>
            <Option>Giá giảm dần</Option>
          </Select>
        </Filter>
      </FilterContainter>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
