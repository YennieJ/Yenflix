import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult } from "../api";
import RankSlider from "Components/RankSlider/RankSlider";
const TopMovies = () => {
  //인기 영화
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );
  return (
    <div>
      {data && (
        <>
          <h1>오늘 대한민국의 TOP 10 영화</h1>
          <RankSlider data={data} />
        </>
      )}
    </div>
  );
};

export default TopMovies;
