import React, { useState } from "react";
import { IMovie } from "service/moviesApi";

import * as S from "./Info.styled";

interface IInfo {
  movie: IMovie;
}

const Info = ({ movie }: IInfo) => {
  const [detailHover, setDetailHover] = useState(false);

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };

  const movieTitle = () => {
    const checkKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
    const checkEN = /[a-zA-Z]/; //영어

    const title = movie.title;
    const originName = movie.original_name;
    const originTitle = movie.original_title;
    const name = movie.name;

    if (checkKR.test(title)) {
      return title;
    } else if (checkKR.test(originName)) {
      return originName;
    } else if (checkEN.test(originTitle)) {
      return originTitle;
    } else {
      return title;
    }

    // if (checkKR.test(originName)) {
    //   return originName;
    // } else if (checkKR.test(originTitle)) {
    //   return originTitle;
    // } else if (checkKR.test(title)) {
    //   return title;
    // } else if (checkKR.test(name)) {
    //   return name;
    // } else if (checkEN.test(originName)) {
    //   return originName;
    // } else if (checkEN.test(originTitle)) {
    //   return originTitle;
    // } else if (checkEN.test(title)) {
    //   return title;
    // } else if (checkEN.test(name)) {
    //   return name;
    // }
  };

  return (
    <S.InfoWrapper>
      <h4>{movieTitle()}</h4>

      <S.StarRate rate={starRate(movie.vote_average)}>
        <div>
          <span>★★★★★</span>
          <span>☆☆☆☆☆</span>
        </div>
        <div> {movie.vote_average.toFixed(1)} </div>
      </S.StarRate>
      <S.BigMovieBox>
        {detailHover && <S.Ballon>상세 정보</S.Ballon>}
        <S.BigMovieButton
          onHoverStart={() => {
            setDetailHover(true);
          }}
          onHoverEnd={() => {
            setDetailHover(false);
          }}
        >
          <i />
        </S.BigMovieButton>
      </S.BigMovieBox>
    </S.InfoWrapper>
  );
};

export default Info;
