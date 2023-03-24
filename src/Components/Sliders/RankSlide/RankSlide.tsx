import React, { useRef, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { IGetMoviesResult } from "service/moviesApi";

import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";
import HoverMovieBox from "./components/HoverMovieBox/HoverMovieBox";

import * as S from "./RankSlide.styled";
import rankNumber from "./RanksNumber";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.3,
    scaleY: 1.6,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

//motion layoutId 는 같은 아이디끼리 부드럽게 이어주는 기능을 가짐 css transition보다 우위에 있음
//hiddenTransition을 layoutId에 연결해야함.
interface ISlider {
  data: IGetMoviesResult;
}

const RankSlide = ({ data }: ISlider) => {
  const [sliderHover, setSliderHover] = useState(false);
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  //index를 쓴 이유는 고유한 키값이 필요한대 나는 무한 슬라이드를 위해서 뒷쪽에 데이터가 더 있었끼때문에
  const onBoxClicked = (movieId: number, i: string) => {
    navigate(`/browse/movies/${movieId}`, { state: { layoutId: i } });
  };
  return (
    <S.Wrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <S.PrevButton onClick={() => sliderRef?.current?.slickPrev()}>
        {sliderHover && <span>&lt;</span>}
      </S.PrevButton>
      <S.NextButton onClick={() => sliderRef?.current?.slickNext()}>
        {sliderHover && <span>&gt;</span>}
      </S.NextButton>
      <S.StyledSlider {...settings} ref={sliderRef}>
        {data?.results.slice(0, 10).map((movie, i) => (
          <S.Box
            key={i}
            variants={boxVariants}
            initial="normal"
            whileHover="hover"
            // onClick={() => onBoxClicked(movie.id, i + "")}
          >
            <img src={rankNumber[i]} alt="" />
            <img src={movieImgPathFn(movie.poster_path, "w500")} alt="" />
            <HoverMovieBox movie={movie} />
          </S.Box>
        ))}
      </S.StyledSlider>

      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </S.Wrapper>
  );
};

export default RankSlide;
