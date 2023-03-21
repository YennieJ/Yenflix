import styled from "styled-components";
import { motion } from "framer-motion";

export const BannerWrapper = styled.div`
  width: 100%;
`;

export const Img = styled.div<{ Img: string }>`
  background-position: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.Img});
  ::after {
    content: "";
    display: block;
    padding-top: calc(9 / 16 * 100%);
  }
`;

export const InfoLayer = styled.div`
  width: 70%;
  height: 70%;

  position: absolute;
  top: 0;
  left: 0;

  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
`;

export const InfoMetaLayer = styled.div`
  width: 45%;

  position: absolute;
  top: 0;
  left: 5%;
  bottom: 35%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const TextMetaLayer = styled.div``;

export const TitleWrapper = styled.div`
  min-height: 8vw;
  margin-bottom: 1.2vw;

  position: relative;

  div {
    text-shadow: 2px 2px 6px black;
    :nth-child(1) {
      font-size: 4vw;
      font-weight: 600;
      word-break: keep-all;
    }
    :nth-child(2) {
      font-size: 3vw;
      font-weight: 400;
    }
  }
`;

export const BigMovieButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid rgba(109, 109, 110, 0.7);
  border-radius: 5px;
  padding: 0.5em;

  font-size: 1.5vw;
  color: white;
  background-color: rgba(109, 109, 110, 0.7);

  cursor: pointer;

  box-shadow: 0px 7px 29px 0px black;

  svg {
    width: 1vw;
    height: 1vw;
    border: 1px solid white;
    border-radius: 50%;
    padding: 5px;
    margin-right: 1vw;
  }
  :hover {
    border: 2px solid rgba(109, 109, 110, 0.5);
    background-color: rgba(109, 109, 110, 0.5);
  }
  :active {
    border: 2px solid white;
    color: rgba(255, 255, 255, 0.7);
  }
`;
