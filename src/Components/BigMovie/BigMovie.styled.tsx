import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  overflow-y: scroll;
  z-index: 5;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 2rem;

  min-width: 850px;
  width: 850px;

  border-radius: 15px;

  background-color: ${(props) => props.theme.black.darker};

  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;

  @media (max-width: 860px) {
    min-width: 0px;

    width: 556px;
  }
  @media (max-width: 570px) {
    width: 480px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 36px;
  height: 36px;

  padding: 0;

  border: none;
  border-radius: 50%;

  background-color: ${(props) => props.theme.black.veryDark};

  font: inherit;
  color: ${(props) => props.theme.white.lighter};
  text-indent: 100%;

  overflow: hidden;

  cursor: pointer;

  z-index: 10;
  &:before,
  &:after {
    position: absolute;
    top: 20%;
    left: calc(50% - 0.0625em);

    width: 2px;
    height: 60%;

    border-radius: 0.125em;
    background: currentcolor;

    transform: rotate(45deg);

    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
  :active {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;

export const ClickedMovieImg = styled.div<{ bgPhoto: string }>`
  position: relative;

  width: 100%;
  height: 480px;

  border-radius: 5px 5px 0 0;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(24, 24, 24, 1)),
    url(${(props) => props.bgPhoto});

  @media (max-width: 860px) {
    height: 380px;
  }
`;

export const TitleWrapper = styled.div`
  position: absolute;
  left: 5%;
  bottom: 40%;

  width: 50%;
  div {
    text-shadow: 2px 2px 6px black;

    :nth-child(1) {
      font-size: 70px;
      font-weight: 600;
      word-break: keep-all;
    }
    :nth-child(2) {
      font-size: 50px;
      font-weight: 400;
    }
  }

  @media (max-width: 860px) {
    bottom: 30%;
  }
`;

export const Content = styled.div`
  padding: 0 35px;

  @media (max-width: 860px) {
    padding: 0 25px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  margin: 30px 0;
`;

export const Overview = styled.p`
  width: 70%;

  color: ${(props) => props.theme.white.lighter};

  font-size: 18px;
  line-height: 1.3;
  word-break: keep-all;

  @media (max-width: 860px) {
    font-size: 15px;
  }
`;

export const Chart = styled.div`
  position: relative;

  width: 120px;
  height: 120px;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 20px;
    font-weight: 400;
  }
`;

const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

const Circle = styled.circle.attrs({
  cx: "100",
  cy: "100",
  r: "90",
})`
  fill: none;
  stroke-width: 25px;
`;
export const BgCircle = styled(Circle)`
  stroke: ${(props) => props.theme.black.veryDark};
`;

export const MainCircle = styled(Circle)<{
  strokeDasharray: string;
  strokeDashoffset: number;
}>`
  animation: ${circleFill} 2s ease;

  stroke: ${(props) => props.theme.white.darker};

  stroke-dasharray: ${(props) => props.strokeDasharray};
  stroke-dashoffset: ${(props) => props.strokeDashoffset};
`;
