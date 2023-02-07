import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { makeImagePath } from "../utilis";
import { IGetSearchResult, ISearch } from "api";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
  margin: 20px 0;
  padding: 0 60px;
`;

const Row = styled(motion.div)`
  display: grid;
  column-gap: 6px;
  grid-template-columns: repeat(6, 1fr);

  width: 100%;
  padding-bottom: 70px;
`;

const Box = styled(motion.div)<{ bgPhoto: string; idx: number }>`
  background-color: #fff;
  background-size: cover;
  background-image: url(${(props) => props.bgPhoto});
  background-position: right;
  height: 150px;
  cursor: pointer;

  transform-origin: ${(props) => props.idx === 0 && "center left"};
  transform-origin: ${(props) => props.idx === 5 && "center right"};
`;

const Info = styled(motion.div)`
  display: none;
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
    display: "block",
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
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
    scale: 1.3,
    // y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data: IGetSearchResult;
}

const offset = 6;

const SearchSlider = ({ data }: ISlider) => {
  const navigate = useNavigate();

  const moviesArray = [];

  for (let i = 0; i < data.results.length / offset; i++) {
    const firstIndex = i * offset;
    const imageMovies: ISearch[] = [];
    data.results.map((a) => a.backdrop_path && imageMovies.push(a));

    const movies = imageMovies.slice(firstIndex, firstIndex + offset);

    moviesArray.push(movies);
  }

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        {moviesArray.map((movies, i) => (
          <Row key={i}>
            {movies.map((movie, i) => (
              <Box
                // layoutId={movie.id + ""}
                onClick={() => onBoxClicked(movie.id)}
                key={i}
                idx={i}
                variants={boxVariants}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                bgPhoto={makeImagePath(movie.backdrop_path, "w300")}
              >
                <Info variants={infoVariants}>
                  {movie.name ? movie.name : movie.original_title}
                </Info>
              </Box>
            ))}
          </Row>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};

export default SearchSlider;
