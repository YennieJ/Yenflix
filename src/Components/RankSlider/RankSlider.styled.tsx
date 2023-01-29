import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  border: 1px solid green;
  margin: 20px 0;
  height: 300px;
`;
export const Row = styled(motion.div)`
  padding: 0 60px;

  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);

  position: absolute;
  width: 100%;
`;

export const ButtonBox = styled.div`
  position: absolute;

  height: 200px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 999999;
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

export const Box = styled(motion.div)<{ index: number }>`
  height: 200px;
  cursor: pointer;

  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img:nth-child(1) {
    border: 1px solid green;

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
`;

export const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 30%;
  padding: 15px;
  h4 {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const StarRate = styled.div<{ rate: number }>`
  display: flex;

  div {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: 25px;
    padding-right: 5px;
    :nth-child(2) {
      font-size: 18px;
    }

    span {
      &:nth-child(1) {
        width: ${(props) => props.rate}%;

        overflow: hidden;
      }
      &:nth-child(2) {
        position: absolute;
      }
    }
  }
`;

export const DatailBtn = styled(motion.button)`
  cursor: pointer;
  padding: 0;
  background: none;
  border: 2px solid gray;
  border-radius: 50%;
  width: 35px;
  height: 35px;

  position: absolute;
  right: 15px;
  bottom: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  i {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`;
