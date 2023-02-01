import React from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "api";
import { makeImagePath } from "utilis";

import * as S from "./BigMovie.styled";

interface IBingMovie {
  clickedMovie: IMovie;
}

const BigMovie = ({ clickedMovie }: IBingMovie) => {
  const navigate = useNavigate();

  const onOverlayClick = () => navigate("/");

  return (
    <>
      <S.Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></S.Overlay>

      <S.Container layoutId={clickedMovie.id + ""}>
        <S.CloseButton onClick={onOverlayClick} />

        <S.Cover bgPhoto={makeImagePath(clickedMovie.backdrop_path)}>
          <S.Title>
            <div>{clickedMovie.title.split(":")[0]}</div>
            <div>{clickedMovie.title.split(":")[1]}</div>
          </S.Title>
        </S.Cover>
        {/* 굉장히 지저분하군. */}

        <S.Info>
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
                } ${2 * Math.PI * 90 * (1 - clickedMovie.vote_average * 0.1)}`}
                strokeDashoffset={2 * Math.PI * 90 * 0.25}
              />
            </svg>
            <span>{clickedMovie.vote_average}</span>
          </S.Chart>
        </S.Info>
      </S.Container>
    </>
  );
};

export default BigMovie;
