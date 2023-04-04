import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import Info from "Components/Info/Info";
import BigMovie from "Components/BigMovie/BigMovie";

import * as S from "./SearchMovies.styled";

interface ISearchMovies {
  movies: IMovie[];
}

const SearchMovies = ({ movies }: ISearchMovies) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { keyword } = location.state;

  const moviePathMatch = searchParams.get("jbv");

  const clickedMovie =
    moviePathMatch &&
    movies.find((movie) => String(movie.id) === moviePathMatch);

  const onBoxClicked = (movieId: number) => {
    navigate(
      {
        pathname: "/browse/search",
        search: `q=${keyword}&jbv=${movieId}`,
      },
      { state: { keyword } }
    );
    document.body.style.overflow = "clip";
  };

  return (
    <S.Wrapper>
      <S.GridContainer>
        {movies.map((movie, i) => (
          <S.GridBox key={i}>
            <S.MovieContainer onClick={() => onBoxClicked(movie.id)}>
              <S.MoviePoster src={movieImgPathFn(movie.poster_path, "w300")} />
              <S.InfoWrapper>
                <Info movie={movie} type="search" />
              </S.InfoWrapper>
            </S.MovieContainer>
          </S.GridBox>
        ))}
      </S.GridContainer>

      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </S.Wrapper>
  );
};

export default SearchMovies;
