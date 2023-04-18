import React from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import LoadingSlider from "Components/Slider/LoadingSlider";
import Slider from "Components/Slider/Slider";
import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";
import rankNumber from "Components/Slider/RanksNumber";

import * as S from "./TopMovies.styled";

const TopMovies = () => {
  const navigate = useNavigate();

  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  //인기 영화
  const { data: PopularMovies, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const clickedMovie =
    moviePathMatch?.params.id &&
    PopularMovies?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  const onBoxClicked = (movieId: number) => {
    navigate(`/browse/movies/${movieId}`);
    document.body.style.overflow = "clip";
  };

  return (
    <S.Wrapper>
      <h2>오늘 대한민국의 TOP 10 영화</h2>

      {isLoading ? (
        <LoadingSlider />
      ) : (
        <>
          {PopularMovies && (
            <Slider>
              {PopularMovies.results.slice(0, 10).map((movie, i) => (
                <S.Box key={i} onClick={() => onBoxClicked(movie.id)}>
                  <S.MovieImg>
                    <img src={rankNumber[i]} alt="" />
                    <img
                      src={movieImgPathFn(movie.poster_path, "w500")}
                      alt=""
                    />
                  </S.MovieImg>
                  <S.HoverBox>
                    <img
                      src={movieImgPathFn(movie.backdrop_path, "w500")}
                      alt=""
                    />
                    <Info movie={movie} />
                  </S.HoverBox>
                </S.Box>
              ))}
            </Slider>
          )}
        </>
      )}

      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </S.Wrapper>
  );
};

export default TopMovies;

// + bigMovie가 열렸을때 overflow가  clip이 되면서 가로 사이즈가 달라짐
