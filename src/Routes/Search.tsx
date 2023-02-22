import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getSearch, IGetSearchResult } from "service/moviesApi";

import SearchSlider from "Components/Sliders/SearchSlider/SearchSlider";

import styled from "styled-components";

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

const Search = () => {
  const location = useLocation();
  // const state = location.state as { keyword: string };
  // const keyword = state.keyword;

  const { keyword } = location.state;
  const { data, isLoading } = useQuery<IGetSearchResult>(
    ["search", keyword],
    () => getSearch(keyword)
  );
  // const [searchParams] = useSearchParams();
  // const temp = searchParams.get("keyword");

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
              about <span>{keyword}</span>
            </Title>
            {data && <SearchSlider data={data} keyword={keyword} />}
          </>
        )}
      </>
    </Wrapper>
  );
};

export default Search;
