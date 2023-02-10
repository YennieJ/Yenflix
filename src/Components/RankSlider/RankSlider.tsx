import React, { useState } from "react";

import { makeImagePath } from "../../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../../RankImage";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info";

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
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");
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
    navigate(`/movies/${movieId}`);
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
                layoutId={movie.id + ""}
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

                <Info movie={movie} />
              </S.Box>
            ))}
        </S.Row>
        <AnimatePresence>
          {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
        </AnimatePresence>
      </AnimatePresence>
    </S.Wrapper>
  );
};

export default RankSlider;
