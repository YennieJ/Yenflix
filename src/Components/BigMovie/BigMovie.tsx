import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getRecommendMovies, IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import * as S from "./BigMovie.styled";

interface IBingMovie {
  clickedMovie: IMovie;
}
const BigMovie = ({ clickedMovie }: IBingMovie) => {
  const { data: recommendMovie, isLoading } = useQuery<IMovie[]>(
    ["movies", "recommend"],
    () => getRecommendMovies(clickedMovie.id)
  );
  const emtpyMovie = recommendMovie && recommendMovie.length === 0;
  const overMovies = recommendMovie && recommendMovie.length > 6;

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMoreMovies = () => setIsOpen(!isOpen);
  const onOverlayClick = () => {
    navigate(-1);
    document.body.style.overflow = "visible";
  };

  return (
    <S.Overlay onClick={onOverlayClick}>
      <S.Container
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <S.CloseButton onClick={onOverlayClick} />
        <S.ClickedMovieCover
          bgPhoto={movieImgPathFn(clickedMovie.backdrop_path)}
        >
          <S.TitleWrapper className="TitleWrapper">
            <div> {clickedMovie.title.split(":")[0]}</div>
            <div>{clickedMovie.title.split(":")[1]}</div>
          </S.TitleWrapper>
        </S.ClickedMovieCover>
        <S.Content>
          <S.InfoContainer>
            <S.Overview>{clickedMovie.overview}</S.Overview>
            <S.Chart>
              <svg viewBox="-10 -10 220 220">
                <circle cx="100" cy="100" r="90" strokeWidth="25" />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  strokeWidth="25"
                  strokeDasharray={`${
                    2 * Math.PI * 90 * (clickedMovie.vote_average * 0.1)
                  } ${
                    2 * Math.PI * 90 * (1 - clickedMovie.vote_average * 0.1)
                  }`}
                  strokeDashoffset={2 * Math.PI * 90 * 0.25}
                />
              </svg>
              <span>{clickedMovie.vote_average.toFixed(1)}</span>
            </S.Chart>
          </S.InfoContainer>
          {!emtpyMovie && (
            <S.RecommendMoviesContainer>
              <h3>함께 시청된 영화</h3>

              <S.Row isOpen={isOpen} overData={overMovies}>
                {recommendMovie?.map((movie, i) => (
                  <S.Box
                    key={i}
                    bgPhoto={movieImgPathFn(movie.backdrop_path, "w300")}
                  >
                    <div />
                    <div>
                      <h4>{movie.title}</h4>
                      <p>{movie.overview}</p>
                    </div>
                  </S.Box>
                ))}
              </S.Row>
              {overMovies && (
                <S.Openbar isOpen={isOpen}>
                  <button onClick={toggleMoreMovies}>
                    <i />
                  </button>
                </S.Openbar>
              )}
            </S.RecommendMoviesContainer>
          )}
        </S.Content>
      </S.Container>
    </S.Overlay>
  );
};

export default BigMovie;
