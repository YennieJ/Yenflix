import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendMovies, IGetMoviesResult, IMovie } from "api";
import { makeImagePath } from "utilis";

import * as S from "./BigMovie.styled";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
const Content = styled.div`
  padding: 0 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height 쓰지마 */
  /* height: 100%; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  h2 {
    padding: 30px 0;
  }
`;

const Row = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 15px;
  overflow: hidden;
  height: ${(props) => (props.isOpen ? "100%" : "1000px")};
`;
const Button = styled.button``;

const Box = styled.div<{ bgPhoto: string }>`
  height: 330px;

  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  cursor: pointer;
  div {
    :nth-child(1) {
      width: 100%;
      height: 45%;
      background-size: cover;
      background-image: url(${(props) => props.bgPhoto});
      border-radius: 5px 5px 0 0;
    }
    :nth-child(2) {
      font-size: 20px;
      font-weight: 600;
      padding: 10px;
    }
  }
  p {
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 6em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;

interface IBingMovie {
  clickedMovie: IMovie;
}
const BigMovie = ({ clickedMovie }: IBingMovie) => {
  const navigate = useNavigate();

  const onOverlayClick = () => navigate("/");

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "recommend"],
    () => getRecommendMovies(clickedMovie.id)
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleMoreMovies = () => setIsOpen(!isOpen);

  return (
    <>
      <S.Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></S.Overlay>

      <S.Container layoutId={clickedMovie.id + ""}>
        <S.CloseButton onClick={onOverlayClick} />

        <S.Cover bgPhoto={makeImagePath(clickedMovie.backdrop_path)}>
          <S.Title>
            <div>{clickedMovie.title.split(":")[0]}</div>
            <div>{clickedMovie.title.split(":")[1]}</div>
          </S.Title>
        </S.Cover>
        {/* 굉장히 지저분하군. */}
        <Content>
          <S.Info>
            <S.Overview>{clickedMovie.overview}</S.Overview>
            <S.Chart>
              <svg viewBox="-10 -10 220 220">
                <circle cx="100" cy="100" r="90" strokeWidth="25" />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  strokeWidth="25"
                  strokeDasharray={`${
                    2 * Math.PI * 90 * (clickedMovie.vote_average * 0.1)
                  } ${
                    2 * Math.PI * 90 * (1 - clickedMovie.vote_average * 0.1)
                  }`}
                  strokeDashoffset={2 * Math.PI * 90 * 0.25}
                />
              </svg>
              <span>{clickedMovie.vote_average}</span>
            </S.Chart>
          </S.Info>
          <Wrapper>
            <h2>함께 시청된 영화</h2>
            <Row isOpen={isOpen}>
              {data?.results.map((movie, i) => (
                <Box
                  key={i}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w300")}
                >
                  <div />
                  <div>{movie.title}</div>
                  <p>{movie.overview}</p>
                </Box>
              ))}
            </Row>
            <Button onClick={toggleMoreMovies}>gg</Button>
          </Wrapper>
        </Content>
      </S.Container>
    </>
  );
};

export default BigMovie;
