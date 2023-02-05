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
  /* height: 10000px; */
  /* top: 30px; */
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 6;
  /* display: flex;
  flex-direction: column; */
  border: 5px solid skyblue;
`;

export const Cover = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 480px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(47, 47, 47, 1)),
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
  width: 2.5em;
  height: 2.5em;
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
