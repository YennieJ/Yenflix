import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* opacity: 0; */
  z-index: 5;
`;

export const Container = styled(motion.div)`
  position: fixed;
  width: 850px;
  height: 100%;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  background-color: ${(props) => props.theme.black.darker};
  z-index: 6;
`;

export const Cover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 480px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(24, 24, 24, 1)),
    url(${(props) => props.bgPhoto});
  position: relative;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  position: absolute;
  top: 60%;
  height: 200px;
  padding: 0 50px;
  div {
    text-shadow: 2px 2px 6px black;
    :nth-child(1) {
      font-size: 70px;
      font-weight: 600;
    }
    :nth-child(2) {
      font-size: 50px;
      font-weight: 400;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 20px 0;
`;

export const Overview = styled.p`
  width: 70%;

  word-break: keep-all;
  color: ${(props) => props.theme.white.lighter};
`;
export const circleFill = keyframes`
    0%{
        stroke-dasharray:0 ${2 * Math.PI * 90};
    }
`;

export const Chart = styled.div`
  width: 120px;
  height: 120px;
  position: relative;

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

export const CloseButton = styled.button`
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  color: ${(props) => props.theme.white.lighter};
  font: inherit;
  text-indent: 100%;
  cursor: pointer;
  background-color: ${(props) => props.theme.black.veryDark};
  z-index: 10;
  &:before,
  &:after {
    position: absolute;
    top: 20%;
    left: calc(50% - 0.0625em);
    width: 2px;
    height: 60%;
    border-radius: 0.125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
  :active {
    border: 2px solid ${(props) => props.theme.white.lighter};
  }
`;

export const Content = styled.div`
  padding: 0 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height 쓰지마 */
  /* height: 100%; */
`;

export const RecommendMoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  h2 {
    padding: 30px 0;
  }
`;

export const Row = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 15px;
  overflow: hidden;
  height: ${(props) => (props.isOpen ? "100%" : "1000px")};
`;
export const Button = styled.button``;

export const Box = styled.div<{ bgPhoto: string }>`
  height: 330px;

  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  cursor: pointer;
  div {
    :nth-child(1) {
      width: 100%;
      height: 45%;
      background-size: cover;
      background-image: url(${(props) => props.bgPhoto});
      border-radius: 5px 5px 0 0;
    }
    :nth-child(2) {
      font-size: 20px;
      font-weight: 600;
      padding: 10px;
    }
  }
  p {
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 6em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;

export const Openbar = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #404040;
  position: relative;

  button {
    cursor: pointer;

    position: absolute;
    bottom: -21px;
    left: 50%;

    width: 42px;
    height: 42px;
    border-radius: 50%;
    color: white;

    background-color: rgba(42, 42, 42, 0.6);
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      border: solid white;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 6px;
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
