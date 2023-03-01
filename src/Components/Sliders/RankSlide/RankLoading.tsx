import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
`;

const Slider = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.black.darker} 1%,
    ${(props) => props.theme.black.lighter} 28%,
    ${(props) => props.theme.black.darker} 53%
  );
  background-size: 2800px;
`;

const Box = styled.li`
  background-color: ${(props) => props.theme.black.veryDark};

  height: 100%;
  width: 5px;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -2800px 0;
    }
    100% {
      background-position: 2800px 0;
    }
  }
`;

const RankLoading = () => {
  const emptyArray = [0, 1, 2, 3, 4, 5];

  return (
    <Container>
      <Slider>
        {emptyArray.map((i) => (
          <Box key={i} />
        ))}
      </Slider>
    </Container>
  );
};

export default RankLoading;
