import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  h2 {
    padding-left: 4%;
    margin-bottom: 1%;
    font-size: 1.4vw;

    font-weight: 500;

    /* 800 이하 font-size: 12px; */
  }

  overflow: hidden;
  padding-top: 10%;
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
export const HoverBox = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 3;

  opacity: 0;

  > img {
    width: 100%;
    height: 65%;
    border-radius: 5px 5px 0 0;
  }
`;
