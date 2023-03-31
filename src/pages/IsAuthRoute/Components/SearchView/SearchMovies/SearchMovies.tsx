import React from "react";

import { IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import Info from "Components/Info/Info";

import * as S from "./SearchMovies.styled";
import { motion } from "framer-motion";

interface ISearchMovies {
  movies: IMovie[];
}

const SearchMovies = ({ movies }: ISearchMovies) => {
  const movieVariants = {
    rest: {
      zIndex: 0,
      scale: 1,
    },
    hover: {
      zIndex: 2,
      scale: 1.1,
      transition: {
        delay: 0.3,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

  const imgMotion = {
    rest: {
      width: "100%",
      height: "100%",
      borderRadius: "5px",
    },
    hover: {
      height: "75%",
      borderRadius: "5px 5px 0 0",

      transition: {
        delay: 0.3,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

  const infoMotion = {
    rest: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

  return (
    <S.Wrapper>
      <S.GridContainer>
        {movies.map((movie, i) => (
          <S.GridBox key={i} idx={i}>
            <S.MovieContainer
              variants={movieVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.img
                variants={imgMotion}
                src={movieImgPathFn(movie.poster_path, "w300")}
                alt=""
              />
              <motion.div variants={infoMotion}>
                <Info movie={movie} type="search" />
              </motion.div>
            </S.MovieContainer>
          </S.GridBox>
        ))}
      </S.GridContainer>
    </S.Wrapper>
  );
};

export default SearchMovies;
