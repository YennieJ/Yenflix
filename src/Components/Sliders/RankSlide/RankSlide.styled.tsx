import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  margin: 20px auto;
  height: 180px;

  width: 100%;

  position: relative;
`;

export const SliderWrapper = styled.div`
  position: relative;

  /* width: 1500px; */

  margin: 0 auto;
  height: 100%;
`;

export const Slider = styled(motion.ul)<{
  page: number;
}>`
  padding: 0 60px;
  position: absolute;
  top: 0;
  left: 0;
  //index가 1이면 5부터시작 slidwidth(250) *4 : *5
  left: ${(props) =>
    props.page === 1 ? `${-props.page * 1000}px` : `${-props.page * 1250}px`};
  left: ${(props) => props.page === -1 && `${-props.page * 1500}px`};

  //results.length(22) * 250)
  width: 5500px;
  height: 100%;

  //initvalue = -(250) * slidCount(6) 시작하는곳
  transform: translateX(-1500px);
`;

export const Box = styled(motion.li)<{ page: number }>`
  width: 250px;
  height: 100%;
  float: left;
  position: relative;

  cursor: pointer;

  padding: 0 0.2vw;
  img:nth-child(1) {
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  img:nth-child(2) {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  img:nth-child(3) {
    display: none;

    width: 100%;
    height: 100%;
    /* transform-origin: right top; */

    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  ${(props) =>
    props.page === 0
      ? css`
          :nth-child(7) {
            transform-origin: center left !important;
          }

          :nth-child(12) {
            transform-origin: center right !important;
          }
        `
      : css`
          :nth-child(11) {
            transform-origin: center left !important;
          }

          :nth-child(16) {
            transform-origin: center right !important;
          }
        `}
`;

export const ButtonBox = styled.button`
  position: absolute;

  height: 180px;
  width: 83px;
  border: none;

  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 1;

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    cursor: pointer;
    color: white;
  }
`;

export const PrevButton = styled(ButtonBox)`
  left: 0;
`;

export const NextButton = styled(ButtonBox)`
  right: 0;
`;
