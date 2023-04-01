import styled from "styled-components";
import { motion } from "framer-motion";

const movieVariants = {
  hover: {
    zIndex: 3,
    scaleX: 1.3,
    scaleY: 1.6,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "spring",
    },
  },
};
const infoMotion = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "spring",
    },
  },
};

export const Wrapper = styled.div`
  padding-top: 10%;

  overflow: hidden;
  h2 {
    padding-left: 4%;
    margin-bottom: 2%;

    font-size: 1.4vw;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    > h2 {
      font-size: 12px;
    }
  }
`;

export const Box = styled(motion.div).attrs({
  variants: movieVariants,
  initial: "rest",
  whileHover: "hover",
  animate: "rest",
})`
  position: relative;

  width: 16.66666667%;

  padding: 0 0.2vw;

  > img:nth-child(1) {
    width: 80%;
    height: 100%;
  }
  > img:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;

    width: 50%;
    height: 100%;
  }
`;
export const HoverBox = styled(motion.div).attrs({
  variants: infoMotion,
})`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  > img {
    width: 100%;
    height: 65%;
    border-radius: 5px 5px 0 0;
  }
  :hover {
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  }
`;
