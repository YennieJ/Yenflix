import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getSearch, IMovie } from "service/moviesApi";

import SearchMovies from "./SearchMovies/SearchMovies";

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

const SearchView = () => {
  const location = useLocation();

  const { keyword } = location.state;
  const { data: movies, isLoading } = useQuery<IMovie[]>(
    ["search", keyword],
    () => getSearch(keyword)
  );

  return (
    <Wrapper>
      <>
        {movies && movies.length === 0 ? (
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
            {movies && <SearchMovies movies={movies} />}
          </>
        )}
      </>
    </Wrapper>
  );
};

export default SearchView;
