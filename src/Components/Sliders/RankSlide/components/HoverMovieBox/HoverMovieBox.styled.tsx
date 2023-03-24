import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
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

export const InfoTextBox = styled(motion.div)`
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 35%;
  padding: 7px;
  border-radius: 0 0 5px 5px;

  background-color: ${(props) => props.theme.black.lighter};

  > h4 {
    font-size: 15px;
    font-weight: 700;
  }
`;

export const StarRate = styled.div<{ rate: number }>`
  display: flex;
  align-items: center;

  div {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    padding-right: 5px;
    :nth-child(2) {
      font-size: 5px;
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

export const BigMovieBox = styled.div`
  position: absolute;
  right: -5px;
  bottom: 7px;

  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BigMovieButton = styled(motion.button)`
  cursor: pointer;
  padding: 0;
  background: none;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  i {
    border: solid white;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  :hover {
    border-color: rgb(255, 255, 255);
  }
  :active {
    border: 2px solid white;
  }
`;
export const Ballon = styled(motion.div)`
  position: relative;

  width: 50px;
  height: 15px;
  border-radius: 2px;
  margin-bottom: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  background-color: whitesmoke;

  font-size: 5px;
  font-weight: 350;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 22px;

    border: solid transparent;
    border-color: whitesmoke transparent transparent transparent;
    border-width: 3px;
  }

  z-index: 4;
`;
