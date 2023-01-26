import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { makeImagePath } from "../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../RankImage";

const Wrapper = styled(motion.div)`
  border: 1px solid green;
  margin: 20px 0;
  height: 300px;
`;
const Row = styled(motion.div)`
  padding: 0 60px;

  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);

  position: absolute;
  width: 100%;
`;

const ButtonBox = styled.div`
  position: absolute;

  height: 250px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 999999;
`;

const PrevButton = styled(ButtonBox)`
  left: 0;
`;

const NextButt = styled(ButtonBox)`
  right: 0;
`;

const Icon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  cursor: pointer;
`;

const Box = styled(motion.div)<{ index: number }>`
  height: 250px;
  cursor: pointer;

  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img:nth-child(1) {
    border: 1px solid green;

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
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
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
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
    zIndex: 2,
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

interface ISlider {
  data: IGetMoviesResult;
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "1",

    scale: 1.3,
    // y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

//왜 width크기가 넘어가는거지?????
const child = {
  hover: {
    width: "100%",
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

const offset = 5;

const Slider = ({ data }: ISlider) => {
  const [hover, setHover] = useState(false);

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

  const dataCount = (i: number) => {
    let nums = i;
    for (let i = 1; i <= index; i++) {
      if (index === 0) {
        return nums;
      } else {
        nums += offset;
      }
    }
    return nums;
  };

  return (
    <Wrapper
      onHoverStart={() => {
        setHover(true);
      }}
      onHoverEnd={() => {
        setHover(false);
      }}
    >
      {hover && (
        <>
          <PrevButton onClick={() => decreaseIndex(-1)}>
            <Icon variants={iconVariants} whileHover="hover">
              &lt;
            </Icon>
          </PrevButton>
          <NextButt onClick={() => increaseIndex(1)}>
            <Icon variants={iconVariants} whileHover="hover">
              &gt;
            </Icon>
          </NextButt>
        </>
      )}

      <AnimatePresence initial={false} custom={direction}>
        <Row
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
              <Box
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                key={movie.id}
                index={index}
              >
                <motion.img
                  variants={childtwo}
                  src={ranks[`${dataCount(i)}`]}
                  alt=""
                />
                <motion.img
                  variants={child}
                  src={makeImagePath(movie.poster_path, "w500")}
                ></motion.img>

                <Info variants={infoVariants}>
                  {movie.name ? movie.name : movie.title}
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Slider;
