import React from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUpcomingMovies, IGetMoviesResult } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import LoadingSlider from "Components/Sliders/LoadingSlider";
import Slider from "Components/Sliders/Slider";
import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";

import * as S from "./UpcomingMovies.styled";

const Upcoming = () => {
  const navigate = useNavigate();

  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  const { data: upcomingMovie, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const clickedMovie =
    moviePathMatch?.params.id &&
    upcomingMovie?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  const onBoxClicked = (movieId: number) => {
    navigate(`/browse/movies/${movieId}`);
    document.body.style.overflow = "clip";
  };

  return (
    <S.Wrapper>
      <h2>개봉 예정 영화</h2>

      {isLoading ? (
        <LoadingSlider />
      ) : (
        <>
          {upcomingMovie && (
            <Slider>
              {upcomingMovie.results.slice(0, 10).map((movie, i) => (
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

export default Upcoming;
