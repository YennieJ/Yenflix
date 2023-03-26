import Info from "Components/Info/Info";
import React from "react";
import { IMovie } from "service/moviesApi";
// import * as S from "./SearchMovies.styled";

import styled from "styled-components";
import { movieImgPathFn } from "utils/movieImgPathFn";

const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 60px;
`;

const Row = styled.div`
  display: grid;
  column-gap: 6px;
  grid-template-columns: repeat(6, 1fr);

  width: 100%;
  padding-bottom: 70px;

  border: 1px solid red;
`;

const Box = styled.div<{ idx: number; Img: string }>`
  position: relative;
  /* width: 100%; */
  height: 150px;
  cursor: pointer;

  border: 1px solid green;
  transform-origin: ${(props) => props.idx === 0 && "center left"};
  transform-origin: ${(props) => props.idx === 5 && "center right"};

  /* width: 100%; */
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.Img});
`;

interface ISearchMovies {
  movies?: IMovie[];
}
const SearchMovies = ({ movies }: ISearchMovies) => {
  return (
    <Wrapper>
      <Row>
        {movies &&
          movies.map((movie, i) => (
            <Box
              key={i}
              idx={i}
              Img={movieImgPathFn(movie.poster_path, "w500")}
            ></Box>
          ))}
      </Row>
    </Wrapper>
  );
};

export default SearchMovies;
