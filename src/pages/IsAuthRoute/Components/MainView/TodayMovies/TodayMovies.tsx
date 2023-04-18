import React from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getTrend, IGetMoviesResult } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import LoadingSlider from "Components/Slider/LoadingSlider";
import Slider from "Components/Slider/Slider";
import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";

import * as S from "./TodayMovies.styled";

const TodayMovies = () => {
  const navigate = useNavigate();

  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  //오늘의 특선 영화
  const { data: trendMovies, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "Trand"],
    getTrend
  );

  const clickedMovie =
    moviePathMatch?.params.id &&
    trendMovies?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  const onBoxClicked = (movieId: number) => {
    navigate(`/browse/movies/${movieId}`);
    document.body.style.overflow = "clip";
  };

  return (
    <S.Wrapper>
      <h2>오늘의 특선 영화</h2>

      {isLoading ? (
        <LoadingSlider />
      ) : (
        <>
          {trendMovies && (
            <Slider>
              {trendMovies.results.slice(0, 10).map((movie, i) => (
                <S.Box key={i} onClick={() => onBoxClicked(movie.id)}>
                  <S.MovieImg
                    src={movieImgPathFn(movie.backdrop_path, "w500")}
                    alt=""
                  />
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

export default TodayMovies;
