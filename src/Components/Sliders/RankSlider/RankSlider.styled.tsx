import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  margin: 20px 0;
  height: 200px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);

  position: absolute;
  width: 100%;
  padding: 0 60px;
  height: 180px;
  border: 1px solid red;
`;

export const Box = styled(motion.div)`
  position: relative;
  height: 180px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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
    transform-origin: right top;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
`;

export const ButtonBox = styled.div`
  position: absolute;

  height: 200px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 1;
`;

export const PrevButton = styled(ButtonBox)`
  left: 0;
`;

export const NextButt = styled(ButtonBox)`
  right: 0;
`;

export const Icon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  cursor: pointer;
`;
