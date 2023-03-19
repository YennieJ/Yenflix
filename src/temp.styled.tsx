import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  position: relative;
  margin: 3vw 0;
  padding: 0;
  border: 1px solid red;
  z-index: 1;
`;

export const RowContainer = styled.div`
  transition: transform 0.54s cubic-bezier(0.5, 0, 0.1, 1) 0s;
  position: relative;
  z-index: 0;
`;

export const PtrackContainer = styled.div``;

export const RowContent = styled.div`
  z-index: 2;
`;

export const Slider = styled.div`
  z-index: 2;
  margin: 0;
  padding: 0 4%;
  position: relative;
  white-space: nowrap;
  /* touch-action: pan-y; */
  padding-bottom: 1px;
`;

export const HadlePrev = styled.span`
  background: hsla(0, 0%, 8%, 0.5);

  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  left: -2px;
`;

export const SliderMask = styled.div`
  overflow-x: visible;
  padding-bottom: 1px;
  white-space: nowrap;
`;

export const sliderContent = styled.div`
  transform: translate3d(-125%, 0px, 0px);
  white-space: nowrap;
`;
export const SliderItem = styled.div`
  width: 16.66666667%;
  display: inline-block;
  padding: 0 0.2vw;
  position: relative;
  vertical-align: top;
  white-space: normal;
  z-index: 1;
`;

export const BoxSiaze = styled.div`
  height: 0;
  overflow: hidden;
  padding: 35.714285714% 0;
  position: relative;
  width: 100%;
`;

export const Imgone = styled.img`
  bottom: 0;
  left: 0;
  position: absolute;
  right: auto;
  top: 0;
  width: 50%;
  border: 1px solid transparent;
  margin: 0 -1px;
  overflow: visible;
`;

export const Imgtwo = styled.img`
  bottom: 0;
  height: 100%;
  left: auto;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
`;
