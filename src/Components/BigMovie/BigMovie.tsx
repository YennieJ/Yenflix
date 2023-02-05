import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendMovies, IGetMoviesResult, IMovie } from "api";
import { makeImagePath } from "utilis";

import * as S from "./BigMovie.styled";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled.div`
  border: 5px solid red;
  /* height: 100%; */

  display: flex;
  flex-direction: column;

  padding-bottom: 50px;
`;

const Row = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 10px;
  border: 5px solid blue;
  overflow: hidden;
  height: ${(props) => (props.isOpen ? "100%" : "1000px")};
`;
const Button = styled.button``;

const Box = styled.div`
  width: 237px;
  height: 343px;

  border: 5px solid gold;
`;

const Content = styled.div`
  padding: 0 48px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height 쓰지마 */
  /* height: 100%; */
  border: 5px solid purple;
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
            <Row isOpen={isOpen}>
              {data?.results.map((temp) => (
                <Box>{temp.title}</Box>
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
