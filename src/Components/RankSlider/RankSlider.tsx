import React, { useState } from "react";

import { makeImagePath } from "../../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../../RankImage";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import DetailPage from "Components/DetailPage";

import styled from "styled-components";

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
  border: none;
`;

const BigCover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 480px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(47, 47, 47, 1)),
    url(${(props) => props.bgPhoto});
`;
//
const Temp = styled.div`
  height: 100%;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
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
                    />
                    <Temp />
                    {/* <BigTitle>{clickedMovie.title}</BigTitle>
                    <BigOverview>{clickedMovie.overview}</BigOverview> */}
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
