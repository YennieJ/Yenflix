import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult } from "service/moviesApi";

import styled from "styled-components";
import RankSlide from "Components/Sliders/RankSlide/RankSlide";
import RankLoading from "Components/Sliders/RankSlide/RankLoading";

const Wrapper = styled.div`
  h2 {
    padding-left: 60px;
    font-size: 3vw;

    font-weight: 500;
  }

  overflow: hidden;
  padding-top: 100px;
`;

const TopMovies = () => {
  //인기 영화
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  return (
    <Wrapper>
      <h2>오늘 대한민국의 TOP 10 영화</h2>

      {isLoading ? <RankLoading /> : <>{data && <RankSlide data={data} />}</>}
    </Wrapper>
  );
};

export default TopMovies;
