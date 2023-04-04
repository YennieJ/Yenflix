import React from "react";

import Banner from "./Banner/Banner";
import TopMovies from "./TopMovies/TopMovies";
import TodayMovies from "./TodayMovies/TodayMovies";
import Upcoming from "./UpcomingMovies/Upcoming";

import * as S from "./MainView.styled";

const MainView = () => {
  return (
    <S.Wrapper>
      <Banner />
      <S.Content>
        <TopMovies />
        <TodayMovies />
        <Upcoming />
      </S.Content>
    </S.Wrapper>
  );
};

export default MainView;
