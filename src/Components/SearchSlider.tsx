import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { makeImagePath } from "../utilis";
import { IGetSearchResult, IMovie } from "api";
import { useNavigate } from "react-router-dom";
import Info from "./Info";

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

const Box = styled(motion.div)<{ idx: number }>`
  position: relative;

  height: 150px;
  cursor: pointer;

  transform-origin: ${(props) => props.idx === 0 && "center left"};
  transform-origin: ${(props) => props.idx === 5 && "center right"};

  img {
    width: 100%;
    height: 100%;
    transform-origin: top;
    border-radius: 5px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.5,
    scaleY: 2.4,

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
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
  data: IGetSearchResult;
  keyword: string | null;
}

const offset = 6;

const SearchSlider = ({ data, keyword }: ISlider) => {
  const navigate = useNavigate();

  const moviesArray = [];

  for (let i = 0; i < data.results.length / offset; i++) {
    const firstIndex = i * offset;
    const imageMovies: IMovie[] = [];
    data.results.map((a) => a.backdrop_path && imageMovies.push(a));

    const movies = imageMovies.slice(firstIndex, firstIndex + offset);

    moviesArray.push(movies);
  }
  // ?keyword=${keyword}
  const onBoxClicked = (movieId: number) => {
    navigate(`/search?keyword=${keyword}/${movieId}`);
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        {moviesArray.map((movies, i) => (
          <Row key={i}>
            {movies.map((movie, i) => (
              <Box
                // layoutId={movie.id + ""}
                key={i}
                idx={i}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                // key={movie.id}
                onClick={() => onBoxClicked(movie.id)}
              >
                <motion.img
                  variants={imgVariants}
                  src={makeImagePath(movie.backdrop_path, "w500")}
                />
                <Info movie={movie} />
              </Box>
            ))}
          </Row>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};

export default SearchSlider;
