import React, { useState } from "react";

import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { IGetMoviesResult } from "service/moviesApi";

import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";

import * as S from "./RankSlide.styled";
import { AnimatePresence, motion } from "framer-motion";
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
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
    display: "none",

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const scaleImgVariants = {
  hover: {
    display: "block",
    scaleY: 0.65,

    borderRadius: "5px 5px 0 0",
    transition: {
      delay: 0.5,
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
  const originData = data && data.results.slice(0, 10);

  const frontClone = originData && originData.slice(-6);
  const backClone = originData && originData.slice(0, 6);

  const movies = frontClone &&
    backClone && [...frontClone, ...originData, ...backClone];

  const [page, setPage] = useState(0);
  const [sliderHover, setSliderHover] = useState(false);

  // transition 있고없고
  const [hiddenTransition, setHiddenTransition] = useState(false);

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

  const nextPage = (newDirection: number) => {
    if (data) {
    }
    setPage(page + newDirection);

    if (page === 1) {
      setTimeout(function () {
        setHiddenTransition(true);

        setPage(0);
      }, 600);
    }
    setTimeout(function () {
      setHiddenTransition(false);
    }, 700);
  };

  const prevPage = (newDirection: number) => {
    if (data) {
    }
    setPage(page + newDirection);

    if (page === 0) {
      setTimeout(function () {
        setHiddenTransition(true);
        setPage(1);
      }, 600);
    }
    setTimeout(function () {
      setHiddenTransition(false);
    }, 700);
  };

  return (
    <S.Container
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <S.PrevButton onClick={() => prevPage(-1)}>
        {sliderHover && <span>&lt;</span>}
      </S.PrevButton>
      <S.NextButton onClick={() => nextPage(1)}>
        {sliderHover && <span>&gt;</span>}
      </S.NextButton>
      <S.SliderWrapper>
        <S.Slider page={page}>
          {movies?.map((movie, i) => (
            <S.Box
              page={page}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              key={i}
              onClick={() => onBoxClicked(movie.id, i + "")}
              layoutId={hiddenTransition ? "" : i + ""}
            >
              <img src={rankNumber[i]} alt="" />
              <motion.img
                variants={imgVariants}
                src={movieImgPathFn(movie.poster_path, "w500")}
                alt=""
              />
              <motion.img
                variants={scaleImgVariants}
                src={movieImgPathFn(movie.backdrop_path, "w500")}
                alt=""
              />
              <Info movie={movie} />
            </S.Box>
          ))}
        </S.Slider>
      </S.SliderWrapper>
      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </S.Container>
  );
};

export default RankSlide;
