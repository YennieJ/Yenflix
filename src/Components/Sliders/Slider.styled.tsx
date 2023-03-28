import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Wrapper = styled(motion.div)`
  position: relative;
  padding: 0 4%;
  height: 100%;
  /*  */
  margin-bottom: 500px;

  cursor: pointer;
`;

export const Box = styled(motion.div)`
  position: relative;
  width: 100%;
  padding: 0 0.2vw;

  width: 16.66666667%;

  > img:nth-child(1) {
    width: 80%;
    height: 100%;
  }
  > img:nth-child(2) {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
`;

export const StyledSlider = styled(Slider)`
  position: static;

  .slick-list {
    overflow: visible;
  }

  .slick-arrow:before {
    display: none;
  }
  .slick-prev:focus {
    background: rgba(0, 0, 0, 0.7);
  }
  /* .slick-slide {
    &:nth-child(11) {
      border: 1px solid green;

      > div > div > div {
        transform-origin: 0 100%;
      }
    }
    &:nth-child(16) {
      border: 1px solid red;
      > div > div > div {
        border: 1px solid green;
        transform-origin: 100% 0;
      }
    }
  } */
`;

export const Button = styled.button<{ pos?: "left" | "right" }>`
  width: 4%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  font-size: 4vw;
  z-index: 1;

  ${({ pos }) =>
    pos === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    color: ${(props) => props.theme.white.lighter};
  }
`;
