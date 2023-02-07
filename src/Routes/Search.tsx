import { useQuery } from "@tanstack/react-query";
import { getSearch, IGetSearchResult } from "../api";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utilis";
import { useEffect } from "react";
import SearchSlider from "Components/SearchSlider";

const Wrapper = styled.div`
  position: relative;
  top: 65px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  padding: 30px 0;
  span {
    font-weight: 600;
    padding: 0 10px;
  }
`;
const Row = styled(motion.div)`
  border: 10px solid red;

  margin: 10px;
`;
const Box = styled.div`
  border: 1px solid orange;
  width: 100%;
  display: flex;
`;
const Img = styled(motion.div)<{ bgPhoto: string }>`
  background-color: #fff;
  background-size: cover;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  height: 200px;
  width: 200px;
  cursor: pointer;
`;

const Info = styled.div`
  width: 100%;
  span {
    font-size: 36px;
  }
`;

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { data, isLoading } = useQuery<IGetSearchResult>(
    ["search", keyword],
    () => getSearch(keyword!)
  );

  return (
    <Wrapper>
      <>
        {data?.results.length === 0 ? (
          <Title style={{ height: "100vh" }}>
            <span>{keyword}</span> can't find
          </Title>
        ) : isLoading ? (
          console.log("loading")
        ) : (
          <>
            <Title>
              about <span>{keyword}</span>{" "}
            </Title>
            {data && <SearchSlider data={data} />}
          </>
        )}
      </>
    </Wrapper>
  );
};

export default Search;
