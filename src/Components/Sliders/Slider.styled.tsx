import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

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

  .slick-slide {
    &:nth-child(4) {
      border: 1px solid green;

      ${Box} {
        > div {
          transform-origin: 0 100%;
        }
      }
    }
  }
`;

export const Button = styled.button<{ pos?: "left" | "right" }>`
  width: 4%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

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

    cursor: pointer;
    color: ${(props) => props.theme.white.lighter};
  }
`;
