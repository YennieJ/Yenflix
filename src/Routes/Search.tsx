import { useQuery } from "@tanstack/react-query";
import { getSearch, IGetSearchResult } from "../api";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utilis";
import { useEffect } from "react";

const Wrapper = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
`;
const Row = styled(motion.div)`
  border: 10px solid red;
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

  console.log(data);

  return (
    <>
      {data?.results.length === 0 ? (
        <Title style={{ height: "100vh" }}>{keyword} can't find</Title>
      ) : isLoading ? (
        console.log("loading")
      ) : (
        <>
          <Title style={{ height: "30vh" }}>about {keyword}</Title>

          <Row>
            {data?.results.map(
              (result) =>
                result.backdrop_path && (
                  <Box key={result.id}>
                    <Img
                      bgPhoto={makeImagePath(result.backdrop_path, "w500")}
                    ></Img>

                    <Info>
                      <span>{result.title}</span>
                      <p>{result.overview}</p>
                    </Info>
                  </Box>
                )
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default Search;
