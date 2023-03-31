import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const InfoWrapper = styled(motion.div)<{ search: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: ${(props) => (props.search ? "25%" : "35%")};
  padding: 0.5vw 1vw;

  border-radius: 0 0 5px 5px;
  background-color: ${(props) => props.theme.black.lighter};

  > h4 {
    font-size: ${(props) => (props.search ? "20px" : " 15px")};
    font-weight: 700;
  }
  @media screen and (max-width: 900px) {
    padding: 1vw 1.5vw;

    > h4 {
      font-size: ${(props) => (props.search ? "20px" : " 1.5vw")};
    }
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StarRate = styled.div<{ rate: number; search: number }>`
  display: flex;
  align-items: center;

  > div {
    display: inline-flex;
    align-items: baseline;

    position: relative;

    padding-right: 5px;

    font-size: ${(props) => (props.search ? "20px" : " 15px")};

    :nth-child(2) {
      font-size: ${(props) => (props.search ? "15px" : " 15px")};
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

  @media screen and (max-width: 800px) {
    > div {
      font-size: ${(props) => (props.search ? "20px" : " 1.5vw")};
      :nth-child(2) {
        font-size: ${(props) => (props.search ? "15px" : " 1.5vw")};
      }
    }
  }
`;

export const Ballon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -25px;

  width: 60px;
  height: 20px;

  border-radius: 2px;
  background-color: whitesmoke;

  color: black;
  font-size: 13px;
  font-weight: 350;

  z-index: 4;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 27px;

    border: solid transparent;
    border-color: whitesmoke transparent transparent transparent;
    border-width: 3px;
  }

  @media screen and (max-width: 800px) {
    top: -20px;

    width: 50px;
    height: 15px;

    font-size: 5px;

    &::after {
      left: 22px;
    }
  }
`;

export const BigMovieBox = styled(motion.div)<{ search: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.search ? "30px" : " 20px")};
    height: ${(props) => (props.search ? "30px" : " 20px")};
    padding: 0;

    border: 1px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 50%;

    background: none;

    i {
      display: inline-block;

      padding: ${(props) => (props.search ? "4px" : " 2px")};

      border: solid white;
      border-width: 0 1px 1px 0;

      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }

    :hover {
      border-color: rgb(255, 255, 255);
    }
    :active {
      border: 2px solid white;
    }

    @media screen and (max-width: 800px) {
      width: ${(props) => (props.search ? "25px" : " 2.5vw")};
      height: ${(props) => (props.search ? "25px" : " 2.5vw")};
      i {
        padding: ${(props) => (props.search ? "2px" : "1px")};
      }
    }
  }
  ${Ballon} {
    ${(props) =>
      props.search &&
      css`
        top: -25px;

        width: 60px;
        height: 20px;

        font-size: 13px;

        ::after {
          left: 27px;
        }
      `}
  }
`;
