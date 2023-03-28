import React, { useState } from "react";

import { IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import Info from "Components/Info/Info";

import * as S from "./SearchMovies.styled";
import styled from "styled-components";
import { motion } from "framer-motion";

const MovieContainer = styled(motion.div)`
  position: relative;

  width: 330px;
  height: 500px;

  cursor: pointer;
  > img {
    display: block;

    width: 100%;
    border: 5px;
  }
`;

const InfoWrapper = styled(motion.div)`
  height: 20%;
  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.black.lighter};

  > h4 {
    font-size: 15px;
    font-weight: 700;
  }
`;

const StarRate = styled.div<{ rate: number }>`
  display: flex;
  align-items: center;

  div {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    padding-right: 5px;
    :nth-child(2) {
      font-size: 5px;
    }

    span {
      &:nth-child(1) {
        width: ${(props) => props.rate}%;

        overflow: hidden;
      }
      &:nth-child(2) {
        position: absolute;
      }
    }
  }
`;

const BigMovieBox = styled.div`
  position: absolute;
  right: -5px;
  bottom: 7px;

  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BigMovieButton = styled(motion.button)`
  cursor: pointer;
  padding: 0;
  background: none;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  i {
    border: solid white;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  :hover {
    border-color: rgb(255, 255, 255);
  }
  :active {
    border: 2px solid white;
  }
`;
export const Ballon = styled(motion.div)`
  position: relative;

  width: 50px;
  height: 15px;
  border-radius: 2px;
  margin-bottom: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  background-color: whitesmoke;

  font-size: 5px;
  font-weight: 350;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 22px;

    border: solid transparent;
    border-color: whitesmoke transparent transparent transparent;
    border-width: 3px;
  }

  z-index: 4;
`;

interface ISearchMovies {
  movies: IMovie[];
}

const movieVariants = {
  rest: {
    zIndex: 0,
    scale: 1,
  },
  hover: {
    zIndex: 3,
    scale: 1.1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgMotion = {
  //for hover
  rest: {
    height: "80%",
    borderRadius: "5px 5px 0 0",
  },
  hover: {
    height: "80%",

    borderRadius: "5px 5px 0 0",

    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const SearchMovies = ({ movies }: ISearchMovies) => {
  const [detailHover, setDetailHover] = useState(false);

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };

  return (
    <S.Wrapper>
      <S.GridContainer>
        {movies.map((movie, i) => (
          <S.GridBox key={i} idx={i}>
            <MovieContainer
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
              <InfoWrapper>
                <h4>{movie.original_name || movie.original_title}</h4>
                <StarRate rate={starRate(movie.vote_average)}>
                  <div>
                    <span>★★★★★</span>
                    <span>☆☆☆☆☆</span>
                  </div>
                  <div> {movie.vote_average.toFixed(1)} </div>
                </StarRate>
                <BigMovieBox>
                  {detailHover && <Ballon>상세 정보</Ballon>}
                  <BigMovieButton
                    onHoverStart={() => {
                      setDetailHover(true);
                    }}
                    onHoverEnd={() => {
                      setDetailHover(false);
                    }}
                  >
                    <i />
                  </BigMovieButton>
                </BigMovieBox>
              </InfoWrapper>
              {/* <Info movie={movie} /> */}
            </MovieContainer>
          </S.GridBox>
        ))}
      </S.GridContainer>
    </S.Wrapper>
  );
};

export default SearchMovies;
