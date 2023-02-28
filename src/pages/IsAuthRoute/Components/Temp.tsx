import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPopularMovies, IGetMoviesResult, IMovie } from "service/moviesApi";
import styled from "styled-components";
import { movieImgPathFn } from "utils/movieImgPathFn";
import rankNumber from "../../../Components/Sliders/RankSlider/RanksNumber";

const Container = styled.div`
  position: fixed;
  top: 100px;
  border: 1px solid red;

  width: 100%;
`;
const SlideWrapper = styled.div`
  position: relative;
  width: 1380px;
  margin: 0 auto;
  height: 200px;
  overflow: hidden;
`;

const Sliders = styled.ul<{ page: number; hiddenTransition: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  //results.length(22) * (slideWidth(200) +slidMargin(30))
  width: 5090px;

  //initvalue = -(slidwidth + slidMargin) * slidCount(6) 시작하는곳
  transform: translateX(-1380px);
  transition: ${(props) => (props.hiddenTransition ? "" : "0.5s ease-out")};

  //index가 1이면 5부터시작 slidwidth(200)+slidMargin(30) *4
  left: ${(props) =>
    props.page === 1 ? `${-props.page * 920}px` : `${-props.page * 1150}px`};
  left: ${(props) => props.page === -1 && `${-props.page * 1380}px`};
`;

const Slide = styled.li`
  width: 230px;
  height: 200px;
  float: left;
  /* margin-right: 30px; */
  border: 1px solid red;

  img {
    width: 80%;
    height: 100%;
  }

  ///////내가 해논거 임시
  font-size: 60px;
  font-weight: 600;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonCover = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  padding: 50px;
  button {
    width: 100px;
    height: 50px;
  }
`;
const Temp = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  const [page, setPage] = useState(0);

  // transition 있고없고
  const [hiddenTransition, setHiddenTransition] = useState(false);
  const nextPage = (newDirection: number) => {
    if (data) {
    }
    setPage(page + newDirection);

    if (page === 1) {
      setTimeout(function () {
        setHiddenTransition(true);

        setPage(0);
      }, 600);
    }
    setTimeout(function () {
      setHiddenTransition(false);
    }, 700);
  };

  const prevPage = (newDirection: number) => {
    if (data) {
    }
    setPage(page + newDirection);

    if (page === 0) {
      setTimeout(function () {
        setHiddenTransition(true);
        setPage(1);
      }, 600);
    }
    setTimeout(function () {
      setHiddenTransition(false);
    }, 700);
  };

  //밖에서 데이타를 만들때;
  const originData = data && data.results.slice(0, 10);

  const frontClone = originData && originData.slice(-6);
  const backClone = originData && originData.slice(0, 6);

  const results = frontClone &&
    backClone && [...frontClone, ...originData, ...backClone];

  return (
    <Container>
      <SlideWrapper>
        <Sliders page={page} hiddenTransition={hiddenTransition}>
          {results?.map((movie, i) => (
            <Slide key={i}>
              <img src={rankNumber[i]} alt="" />
              {/* <img src={movieImgPathFn(movie.poster_path, "w500")} alt="" /> */}
            </Slide>
          ))}
        </Sliders>
      </SlideWrapper>
      <ButtonCover>
        <button onClick={() => prevPage(-1)}>prev</button>
        <button onClick={() => nextPage(1)}>next</button>
      </ButtonCover>
    </Container>
  );
};

export default Temp;
