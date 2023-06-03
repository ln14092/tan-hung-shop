import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Search as SearchUI, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import "../App.css";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
  outline: none;
`;

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    axios
      .get(`http://localhost:5000/api/products/search`, {
        params: {
          title: debounceValue,
        },
      })
      .then((res) => {
        setSearchResult(res.data.products);
      })
      .catch(() => {
        alert("Đã có lỗi xảy ra ...");
      });
  }, [debounceValue]);

  return (
    <div style={{ position: "relative" }}>
      <SearchContainer>
        <Input
          type="search"
          placeholder="Search..."
          value={searchValue}
          ref={inputRef}
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchUI style={{ color: "gray", fontSize: 16 }} />
      </SearchContainer>
      {searchResult.length > 0 && (
        <ul className="search-result">
          {searchResult.map((result) => (
            <Link
              to={`/products/${result._id}`}
              className="result-item"
              key={result._id}
            >
              <h3 className="result-title">{result.title} </h3>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
