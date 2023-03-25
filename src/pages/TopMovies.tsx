import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult } from "service/moviesApi";

import styled from "styled-components";
import RankSlide from "Components/Sliders/RankSlide/RankSlide";
import RankLoading from "Components/Sliders/RankSlide/RankLoading";

const Wrapper = styled.div`
  h2 {
    padding-left: 4%;
    margin-bottom: 1%;
    font-size: 1.4vw;

    font-weight: 500;

    /* 800 이하 font-size: 12px; */
  }

  overflow: hidden;
  padding-top: 10%;
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
