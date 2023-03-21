import React from "react";

import Banner from "./Banner/Banner";
import TopMovies from "pages/TopMovies";

import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;
const MainView = () => {
  return (
    <Wrapper>
      <Banner />
      <TopMovies />
    </Wrapper>
  );
};

export default MainView;
