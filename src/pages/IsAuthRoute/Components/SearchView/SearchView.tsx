import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getSearch, IMovie } from "service/moviesApi";

import SearchMovies from "./SearchMovies/SearchMovies";
import LoadingSpinner from "Components/LoadingSpinner/LoadingSpinner";

import * as S from "./SearchView.styled";

const SearchView = () => {
  const location = useLocation();

  const { keyword } = location.state;
  const { data: movies, isLoading } = useQuery<IMovie[]>(
    ["search", keyword],
    () => getSearch(keyword)
  );

  return (
    <S.Wrapper>
      <>
        {movies && movies.length === 0 ? (
          <S.Title style={{ height: "100vh" }}>
            <span>{keyword}</span> can't find
          </S.Title>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <S.Title>
              about <span>{keyword}</span>
            </S.Title>
            {movies && <SearchMovies movies={movies} />}
          </>
        )}
      </>
    </S.Wrapper>
  );
};

export default SearchView;
