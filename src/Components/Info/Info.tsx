import React, { useState } from "react";
import { IMovie } from "service/moviesApi";

import * as S from "./Info.styled";
import { motion } from "framer-motion";

interface IInfo {
  movie: IMovie;
  type?: string;
}

const Info = ({ movie, type }: IInfo) => {
  const isSearch = type === "search";

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

    if (checkKR.test(title)) {
      return title;
    } else if (checkKR.test(originName)) {
      return originName;
    } else if (checkEN.test(originTitle)) {
      return originTitle;
    } else {
      return title;
    }
  };

  return (
    <S.InfoWrapper search={isSearch ? 1 : 0}>
      <h4>
        {isSearch ? movie.original_name || movie.original_title : movieTitle()}
      </h4>
      <S.FlexBox>
        <S.StarRate
          rate={starRate(movie.vote_average)}
          search={isSearch ? 1 : 0}
        >
          <div>
            <span>★★★★★</span>
            <span>☆☆☆☆☆</span>
          </div>
          <div> {movie.vote_average.toFixed(1)} </div>
        </S.StarRate>
        <S.BigMovieBox
          onHoverStart={() => {
            setDetailHover(true);
          }}
          onHoverEnd={() => {
            setDetailHover(false);
          }}
          search={isSearch ? 1 : 0}
        >
          {detailHover && <S.Ballon>상세 정보</S.Ballon>}
          <button>
            <i />
          </button>
        </S.BigMovieBox>
      </S.FlexBox>
    </S.InfoWrapper>
  );
};

export default Info;
