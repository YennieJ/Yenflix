import { useQuery } from "@tanstack/react-query";
import Info from "Components/Info/Info";
import React, { useState } from "react";
import { getPopularMovies, IGetMoviesResult } from "service/moviesApi";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { movieImgPathFn } from "utils/movieImgPathFn";
import rankNumber from "../../../Components/Sliders/RankSlider/RanksNumber";

const Container = styled(motion.div)`
  margin: 20px 0;
  height: 180px;

  width: 100%;
`;
const SlideWrapper = styled.div`
  position: relative;
  width: 1500px;
  margin: 0 auto;
  height: 100%;
`;

const Sliders = styled.ul<{ page: number; hiddenTransition: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  //results.length(22) * 250)
  width: 5500px;

  //initvalue = -(250) * slidCount(6) 시작하는곳
  transform: translateX(-1500px);
  transition: ${(props) => (props.hiddenTransition ? "" : "0.5s ease-out")};

  //index가 1이면 5부터시작 slidwidth(250) *4 : *5
  left: ${(props) =>
    props.page === 1 ? `${-props.page * 1000}px` : `${-props.page * 1250}px`};
  left: ${(props) => props.page === -1 && `${-props.page * 1500}px`};
`;

const Slide = styled(motion.li)<{ page: number }>`
  width: 250px;
  height: 100%;
  float: left;
  position: relative;

  cursor: pointer;

  img:nth-child(1) {
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  img:nth-child(2) {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  img:nth-child(3) {
    display: none;

    width: 100%;
    height: 100%;
    transform-origin: right top;

    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  ${(props) =>
    props.page === 0
      ? css`
          :nth-child(7) {
            transform-origin: center left;
          }

          :nth-child(12) {
            transform-origin: center right;
          }
        `
      : css`
          :nth-child(11) {
            transform-origin: center left;
          }

          :nth-child(16) {
            transform-origin: center right;
          }
        `}
`;

const CoverOverflow = styled.div`
  span {
    position: absolute;
    width: 83px;
    height: 180px;
    background-color: rgba(0, 0, 0, 0.7);

    z-index: 1;
  }
  span:nth-child(1) {
    left: 0;
  }
  span:nth-child(2) {
    right: 0;
  }
`;

const ButtonBox = styled.button`
  position: absolute;

  height: 180px;
  width: 80px;
  border: none;
  background: none;

  font-size: 40px;
  font-weight: 400;

  z-index: 1;

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    cursor: pointer;
    color: white;
  }
`;

const PrevButton = styled(ButtonBox)`
  left: 0;
`;

const NextButton = styled(ButtonBox)`
  right: 0;
`;

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

    borderRadius: "5px 5px 0 0",
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

const Temp = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const [page, setPage] = useState(0);

  // transition 있고없고
  const [hiddenTransition, setHiddenTransition] = useState(false);
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

  //밖에서 데이타를 만들때;
  const originData = data && data.results.slice(0, 10);

  const frontClone = originData && originData.slice(-6);
  const backClone = originData && originData.slice(0, 6);

  const results = frontClone &&
    backClone && [...frontClone, ...originData, ...backClone];

  const [sliderHover, setSliderHover] = useState(false);

  return (
    <Container
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <CoverOverflow>
        <span />
        <span />
      </CoverOverflow>
      {sliderHover && (
        <>
          <PrevButton onClick={() => prevPage(-1)}>
            <span>&lt;</span>{" "}
          </PrevButton>
          <NextButton onClick={() => nextPage(1)}>
            <span>&gt;</span>{" "}
          </NextButton>
        </>
      )}

      <SlideWrapper>
        <Sliders page={page} hiddenTransition={hiddenTransition}>
          {results?.map((movie, i) => (
            <Slide
              page={page}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              key={i}
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
            </Slide>
          ))}
        </Sliders>
      </SlideWrapper>
    </Container>
  );
};

export default Temp;
