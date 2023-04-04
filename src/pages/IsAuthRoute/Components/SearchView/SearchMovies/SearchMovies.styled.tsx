import styled from "styled-components";
import { motion } from "framer-motion";

const movieVariants = {
  rest: {
    zIndex: 0,
    scale: 1,
  },
  hover: {
    zIndex: 2,
    scale: 1.1,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgMotion = {
  rest: {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  },
  hover: {
    height: "75%",
    borderRadius: "5px 5px 0 0",

    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
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
      type: "tween",
    },
  },
};

export const Wrapper = styled.div`
  margin: 20px 0;
  padding: 0 60px;
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  padding-bottom: 70px;
`;

export const GridBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const MovieContainer = styled(motion.div).attrs({
  variants: movieVariants,
  initial: "rest",
  whileHover: "hover",
  animate: "rest",
  alt: "",
})`
  position: relative;

  width: 300px;
  height: 400px;

  cursor: pointer;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  }
`;

export const MoviePoster = styled(motion.img).attrs({
  variants: imgMotion,
})`
  width: 100%;
  height: 100%;
`;

export const InfoWrapper = styled(motion.div).attrs({
  variants: infoMotion,
})``;
