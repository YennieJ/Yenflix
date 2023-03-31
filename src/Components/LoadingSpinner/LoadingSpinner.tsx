import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80vh;
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;

  width: 80px;
  height: 80px;

  > div {
    display: block;

    position: absolute;

    width: 64px;
    height: 64px;
    margin: 8px;

    border: 8px solid #fff;
    border-color: #fff transparent transparent transparent;
    border-radius: 50%;

    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    :nth-child(1) {
      animation-delay: -0.45s;
    }
    :nth-child(2) {
      animation-delay: -0.3s;
    }
    :nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner>
        <div /> <div /> <div />
        <div />
      </Spinner>
    </Wrapper>
  );
};

export default LoadingSpinner;
