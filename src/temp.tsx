import React, { useState } from "react";

import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { IGetMoviesResult } from "service/moviesApi";

import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";

import * as S from "./temp.styled";
import { AnimatePresence, motion } from "framer-motion";
import rankNumber from "Components/Sliders/RankSlide/RanksNumber";

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
    // scaleY: 0.65,
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

const Temp = ({ data }: ISlider) => {
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
    <S.Container className="Container">
      <h2>제목이 있네</h2>
      <S.RowContainer>
        <S.PtrackContainer>
          <S.RowContent>
            <S.Slider>
              <S.HadlePrev> prev </S.HadlePrev>
              <S.SliderMask>
                <S.sliderContent>
                  {movies.map((movie, i) => (
                    <S.SliderItem>
                      <S.BoxSiaze>
                        <S.Imgone src={rankNumber[i]} alt="" />
                        <S.Imgtwo
                          src={movieImgPathFn(movie.poster_path, "w500")}
                          alt=""
                        />
                      </S.BoxSiaze>
                    </S.SliderItem>
                  ))}
                </S.sliderContent>
              </S.SliderMask>
            </S.Slider>
          </S.RowContent>
        </S.PtrackContainer>
      </S.RowContainer>
    </S.Container>
  );
};

export default Temp;
