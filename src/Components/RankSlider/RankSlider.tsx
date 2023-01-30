import React, { useState } from "react";

import { makeImagePath } from "../../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../../RankImage";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";

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
  hover: {
    zIndex: "2",
    width: "300px",
    height: "350px",

    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

//반응이 느린데?
const child = {
  hover: {
    width: "100%",
    height: "70%",
    borderRadius: "5px 5px 0 0",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const childtwo = {
  hover: {
    opacity: 0,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const detailBtnVarians = {
  hover: {
    borderColor: "rgb(255,255,255)",
  },
  tap: {
    border: "4px solid white",
  },
};

interface ISlider {
  data: IGetMoviesResult;
}

const offset = 5;

const RankSlider = ({ data }: ISlider) => {
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
            .slice(offset * index, offset * index + offset)
            .map((movie, i) => (
              <S.Box
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                key={movie.id}
                index={index}
              >
                <motion.img
                  variants={childtwo}
                  src={ranks[`${rankCount(i)}`]}
                  alt=""
                />
                <motion.img
                  variants={child}
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
                      variants={detailBtnVarians}
                      whileHover="hover"
                      whileTap="tap"
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
      </AnimatePresence>
    </S.Wrapper>
  );
};

export default RankSlider;
