import styled from "styled-components";
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
  border: 1px solid red;

  cursor: pointer;
`;

export const ButtonBox = styled.button`
  position: absolute;

  height: 100%;
  width: 4%;
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
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const PrevButton = styled(ButtonBox)`
  left: 0;
`;

export const NextButton = styled(ButtonBox)`
  right: 0;
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
  .slick-prev:before,
  .slick-next:before,
  .slick-arrow,
  .slick-dots {
    display: none !important;
  }
  .slick-list {
    overflow: visible;
  }
`;
