import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

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
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Title>Váy</Title>
      <FilterContainter>
        <Filter>
          <FilterText>Lọc sản phẩm: </FilterText>
          <Select name="color" onChange={handleFilters}>
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
          <Select name="size" onChange={handleFilters}>
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
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option selected value="newest">
              Sản phẩm mới nhất
            </Option>
            <Option value="asc">Giá tăng dần</Option>
            <Option value="desc">Giá giảm dần</Option>
          </Select>
        </Filter>
      </FilterContainter>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
