import React, { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { IGetMoviesResult } from "service/moviesApi";

import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";
import rankNumber from "./RanksNumber";

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
    scaleY: 0.65,

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
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");
  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );
  const [sliderHover, setSliderHover] = useState(false);

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

  const onBoxClicked = (movieId: number) => {
    navigate(`/browse/movies/${movieId}`);
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

      {/* <AnimatePresence initial={false} custom={direction}> */}
      <S.Row
        // variants={rowVariants}
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
              layoutId={movie.id + ""}
              variants={boxVariants}
              initial="normal"
              whileHover="hover"
              key={movie.id}
              onClick={() => onBoxClicked(movie.id)}
            >
              <motion.img src={rankNumber[`${rankCount(i)}`]} alt="" />
              <motion.img
                variants={imgVariants}
                src={movieImgPathFn(movie.poster_path, "w500")}
              ></motion.img>

              <Info movie={movie} />
            </S.Box>
          ))}
      </S.Row>
      <AnimatePresence>
        {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
      </AnimatePresence>
      {/* </AnimatePresence> */}
    </S.Wrapper>
    // <>
    //   <SlideWrapper>
    //     <Slides>
    //       {data?.results.slice(0, 5).map((movie, i) => (
    //         <Slide style={{ border: "6px solid green" }} key={i}>
    //           {" "}
    //           {movie.title}
    //         </Slide>
    //       ))}
    //       {data?.results.slice(0, 5).map((movie, i) => (
    //         <Slide key={i}> {movie.title}</Slide>
    //       ))}
    //       {data?.results.slice(0, 5).map((movie, i) => (
    //         <Slide key={i}> {movie.title}</Slide>
    //       ))}
    //     </Slides>
    //   </SlideWrapper>
    //   <button>prev</button>
    //   <button>next</button>
    // </>
  );
};

export default RankSlider;
