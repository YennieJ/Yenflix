import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult, IMovie } from "../api";
import RankSlider from "Components/Sliders/RankSlider/RankSlider";

import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  top: -200px;

  padding: 30px 0;
  h2 {
    padding-left: 60px;
    font-size: 25px;
    font-weight: 500;
  }
`;

const TopMovies = () => {
  //인기 영화
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  // increase 와 decrease를 더 깔끔하게 쓸수 있게 하기
  // const paginate = (newDirection: number) => {
  //   setPage([page + newDirection, newDirection]);
  // };

  return (
    <Wrapper>
      {data && (
        <>
          <h2>오늘 대한민국의 TOP 10 영화</h2>
          <RankSlider data={data} />
        </>
      )}
    </Wrapper>
  );
};

export default TopMovies;
