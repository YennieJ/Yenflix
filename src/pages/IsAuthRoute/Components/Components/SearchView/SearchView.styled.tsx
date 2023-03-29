import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  top: 65px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 30px 0;

  font-size: 35px;
  span {
    padding: 0 10px;

    font-weight: 600;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80vh;
`;

export const Spinner = styled.div`
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
