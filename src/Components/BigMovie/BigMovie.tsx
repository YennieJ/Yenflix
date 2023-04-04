import React from "react";
import { useNavigate } from "react-router-dom";

import { IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import RecommenMovies from "./Components/RecommendMovies/RecommendMovies";

import * as S from "./BigMovie.styled";

interface IBingMovie {
  clickedMovie: IMovie;
}

// MainView > TopMovies
// SearchView > SearchMovies

const BigMovie = ({ clickedMovie }: IBingMovie) => {
  const navigate = useNavigate();

  const onOverlayClick = () => {
    navigate(-1);
    document.body.style.overflow = "visible";
  };

  // for css
  const strokeDasharray = `${
    2 * Math.PI * 90 * (clickedMovie.vote_average * 0.1)
  } ${2 * Math.PI * 90 * (1 - clickedMovie.vote_average * 0.1)}`;

  const strokeDashoffset = 2 * Math.PI * 90 * 0.25;

  return (
    <S.Overlay onClick={onOverlayClick}>
      <S.Wrapper
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <S.CloseButton onClick={onOverlayClick} />
        <S.ClickedMovieImg bgPhoto={movieImgPathFn(clickedMovie.backdrop_path)}>
          <S.TitleWrapper className="TitleWrapper">
            <div> {clickedMovie.title.split(":")[0]}</div>
            <div>{clickedMovie.title.split(":")[1]}</div>
          </S.TitleWrapper>
        </S.ClickedMovieImg>
        <S.Content>
          <S.InfoContainer>
            <S.Overview>{clickedMovie.overview}</S.Overview>
            <S.Chart>
              <svg viewBox="-10 -10 220 220">
                <S.BgCircle />
                <S.MainCircle
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <span>{clickedMovie.vote_average.toFixed(1)}</span>
            </S.Chart>
          </S.InfoContainer>
          <RecommenMovies clickedMovie={clickedMovie} />
        </S.Content>
      </S.Wrapper>
    </S.Overlay>
  );
};

export default BigMovie;
