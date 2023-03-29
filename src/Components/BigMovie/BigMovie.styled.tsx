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

export const Container = styled.div`
  position: absolute;
  top: 2rem;

  min-width: 850px;
  width: 850px;

  border-radius: 15px;

  background-color: ${(props) => props.theme.black.darker};

  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;

  @media (max-width: 860px) {
    min-width: 0px;

    width: 556.34px;
  }
  @media (max-width: 560px) {
    min-width: 0px;

    width: 460.3px;
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

export const ClickedMovieCover = styled.div<{ bgPhoto: string }>`
  position: relative;

  width: 100%;
  height: 480px;

  border-radius: 5px 5px 0 0;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(24, 24, 24, 1)),
    url(${(props) => props.bgPhoto});
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
`;

const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

export const Chart = styled.div`
  position: relative;

  width: 120px;
  height: 120px;

  circle {
    fill: none;
    :nth-child(1) {
      stroke: ${(props) => props.theme.black.veryDark};
    }
    :nth-child(2) {
      stroke: ${(props) => props.theme.white.darker};
      animation: ${circleFill} 2s ease;
    }
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 20px;
    font-weight: 400;
  }
`;

export const RecommendMoviesContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 50px;

  > h3 {
    margin-bottom: 15px;

    font-size: 25px;
    font-weight: 500;
  }
`;

export const Row = styled.div<{ isOpen: boolean; overData?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  width: 100%;
  height: ${(props) =>
    props.overData ? (props.isOpen ? "100%" : "700px") : "100%"};

  overflow: hidden;

  @media (max-width: 860px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Box = styled.div<{ bgPhoto: string }>`
  height: 300px;

  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};

  > div {
    :nth-child(1) {
      width: 100%;
      height: 50%;

      background-size: cover;
      background-image: url(${(props) => props.bgPhoto});
      border-radius: 5px 5px 0 0;
    }

    :nth-child(2) {
      padding: 15px 10px 0px 10px;

      > h4 {
        margin-bottom: 5px;

        font-size: 20px;
        font-weight: 400;
      }
      > p {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        height: 5em;

        font-size: 17px;
        line-height: 1.3;

        text-align: left;
        text-overflow: ellipsis;
        white-space: normal;
        word-wrap: break-word;

        overflow: hidden;
      }
    }
  }

  @media (max-width: 860px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 130px;

    padding: 0 10px;
    > div {
      :nth-child(1) {
        width: 33%;
        height: 70%;
      }
      :nth-child(2) {
        width: 65%;

        padding: 0;
        > p {
          -webkit-line-clamp: 3;

          height: 4em;

          font-size: 15px;
        }
      }
    }
  }
`;

export const Openbar = styled.div<{ isOpen: boolean }>`
  position: relative;

  width: 100%;
  height: 70px;
  border-bottom: 2px solid #404040;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: -21px;
    left: 50%;

    width: 42px;
    height: 42px;

    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 50%;
    background-color: rgba(42, 42, 42, 0.6);

    color: ${(props) => props.theme.white.lighter};

    i {
      display: inline-block;

      padding: 6px;

      border: solid white;
      border-width: 0 1px 1px 0;

      transform: ${(props) =>
        props.isOpen ? "rotate(225deg)" : "rotate(45deg)"};
      -webkit-transform: ${(props) =>
        props.isOpen ? "rotate(225deg)" : "rotate(45deg)"};
    }
    :hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
    :active {
      border: 5px solid white;
    }
  }
`;
