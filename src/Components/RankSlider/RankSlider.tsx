import React, { useState } from "react";

import { makeImagePath } from "../../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../../RankImage";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import DetailPage from "Components/DetailPage";

import styled, { keyframes } from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 5;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 850px;
  height: 100vh;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 6;
  display: flex;
  flex-direction: column;
`;

const BigCover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 480px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(47, 47, 47, 1)),
    url(${(props) => props.bgPhoto});
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: 60%;
  height: 200px;
  padding: 0 50px;
  div {
    text-shadow: 2px 2px 6px black;
    :nth-child(1) {
      font-size: 70px;
      font-weight: 600;
    }
    :nth-child(2) {
      font-size: 50px;
      font-weight: 400;
    }
  }
`;

const BigInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 150px;
`;
const BigOverview = styled.p`
  width: 70%;

  word-break: keep-all;
  color: ${(props) => props.theme.white.lighter};
`;
const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

const CircleBar = styled.div`
  width: 120px;
  height: 120px;
  position: relative;

  circle {
    fill: none;
    :nth-child(1) {
      stroke: ${(props) => props.theme.black.veryDark};
    }
    :nth-child(2) {
      stroke: ${(props) => props.theme.white.darker};
      animation: ${circleFill} 2s ease;
    }
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 20px;
    font-weight: 400;
  }
`;

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const infoVariants = {
  hover: {
    opacity: 1,
    borderRadius: "0 0 5px 5px",

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
    zIndex: 3,
  },
};

const iconVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.5,
    scaleY: 2,

    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
    scaleX: 2,
    scaleY: 0.7,

    borderRadius: "5px 5px 0 0",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data: IGetMoviesResult;
}

const offset = 4;

const RankSlider = ({ data }: ISlider) => {
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

  const [sliderHover, setSliderHover] = useState(false);
  const [detailHover, setDetailHover] = useState(false);

  const [index, setIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const increaseIndex = (newDirection: number) => {
    if (data) {
      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }
    setPage([page + newDirection, newDirection]);
  };

  const decreaseIndex = (newDirection: number) => {
    if (data) {
      setIndex((prev) => (prev === 0 ? 1 : prev - 1));
    }
    setPage([page + newDirection, newDirection]);
  };

  const rankCount = (nums: number) => {
    for (let i = 1; i <= index; i++) {
      if (index === 0) {
        return nums;
      } else {
        nums += offset;
      }
    }
    return nums;
  };

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  return (
    <S.Wrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      {sliderHover && (
        <>
          <S.PrevButton onClick={() => decreaseIndex(-1)}>
            <S.Icon variants={iconVariants} whileHover="hover">
              &lt;
            </S.Icon>
          </S.PrevButton>
          <S.NextButt onClick={() => increaseIndex(1)}>
            <S.Icon variants={iconVariants} whileHover="hover">
              &gt;
            </S.Icon>
          </S.NextButt>
        </>
      )}

      <AnimatePresence initial={false} custom={direction}>
        <S.Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={page}
          custom={direction}
        >
          {data?.results
            .slice(offset * index, offset * index + offset + 2)

            .map((movie, i) => (
              <S.Box
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                key={movie.id}
                onClick={() => onBoxClicked(movie.id)}
              >
                <motion.img src={ranks[`${rankCount(i)}`]} alt="" />
                <motion.img
                  variants={imgVariants}
                  src={makeImagePath(movie.poster_path, "w500")}
                ></motion.img>

                <S.Info variants={infoVariants}>
                  <h4> {movie.name ? movie.name : movie.title} </h4>
                  <S.StarRate rate={starRate(movie.vote_average)}>
                    <div>
                      <span>★★★★★</span>
                      <span>☆☆☆☆☆</span>
                    </div>
                    <div> {movie.vote_average} </div>
                  </S.StarRate>
                  <S.DetailBox>
                    {detailHover && <S.Ballon>상세 정보</S.Ballon>}
                    <S.DatailBtn
                      onHoverStart={() => {
                        setDetailHover(true);
                      }}
                      onHoverEnd={() => {
                        setDetailHover(false);
                      }}
                    >
                      <i></i>
                    </S.DatailBtn>
                  </S.DetailBox>
                </S.Info>
              </S.Box>
            ))}
        </S.Row>
        <AnimatePresence>
          {moviePathMatch ? (
            <>
              <Overlay
                onClick={onOverlayClick}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></Overlay>
              <BigMovie layoutId={moviePathMatch.params.id}>
                {clickedMovie && (
                  <>
                    <BigCover
                      bgPhoto={makeImagePath(clickedMovie.backdrop_path)}
                    >
                      <BigTitle>
                        <div>{clickedMovie.title.split(":")[0]}</div>
                        <div>{clickedMovie.title.split(":")[1]}</div>
                      </BigTitle>
                    </BigCover>

                    {/* 굉장히 지저분하군. */}

                    <BigInfo>
                      <BigOverview>{clickedMovie.overview}</BigOverview>

                      <CircleBar>
                        <svg viewBox="-10 -10 220 220">
                          <circle cx="100" cy="100" r="90" strokeWidth="25" />
                          <circle
                            cx="100"
                            cy="100"
                            r="90"
                            strokeWidth="25"
                            strokeDasharray={`${
                              2 *
                              Math.PI *
                              90 *
                              (clickedMovie.vote_average * 0.1)
                            } ${
                              2 *
                              Math.PI *
                              90 *
                              (1 - clickedMovie.vote_average * 0.1)
                            }`}
                            strokeDashoffset={2 * Math.PI * 90 * 0.25}
                          />
                        </svg>
                        <span>{clickedMovie.vote_average}</span>
                      </CircleBar>
                    </BigInfo>

                    {/* <Temp /> */}
                  </>
                )}
              </BigMovie>
            </>
          ) : null}
        </AnimatePresence>
      </AnimatePresence>
    </S.Wrapper>
  );
};

export default RankSlider;
