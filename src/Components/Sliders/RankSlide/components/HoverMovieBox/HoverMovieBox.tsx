import React, { useState } from "react";
import { IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";
import * as S from "./HoverMovieBox.styled";

const hoverBoxVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface IHoverMovieBox {
  movie: IMovie;
}
const HoverMovieBox = ({ movie }: IHoverMovieBox) => {
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
    <S.Wrapper variants={hoverBoxVariants} whileHover="hover">
      <img src={movieImgPathFn(movie.backdrop_path, "w500")} alt="" />
      <S.InfoTextBox>
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
      </S.InfoTextBox>
    </S.Wrapper>
  );
};

export default HoverMovieBox;
