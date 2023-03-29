import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Wrapper = styled(motion.div)`
  position: relative;

  height: 100%;

  padding: 0 4%;

  cursor: pointer;

  /*  */
  margin-bottom: 500px;
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
`;

export const Button = styled.button<{ pos?: "left" | "right" }>`
  position: absolute;

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

  :hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;
