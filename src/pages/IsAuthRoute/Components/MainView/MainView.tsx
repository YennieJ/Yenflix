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

// + overflow hidden이 필요해서 scale때문에 padding값을 많이 줘야하는데 다른 방법 찾아보기
