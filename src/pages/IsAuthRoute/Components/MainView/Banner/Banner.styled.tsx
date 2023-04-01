import styled from "styled-components";
import { motion } from "framer-motion";

export const BannerWrapper = styled.div`
  width: 100%;
`;

export const LoadingBanner = styled.div`
  ::after {
    display: block;
    padding-top: calc(9 / 16 * 100%);
    content: "";
  }
`;

export const BannerImg = styled.div<{ Img: string }>`
  background-position: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(20, 20, 20, 1)),
    url(${(props) => props.Img});

  ::after {
    display: block;
    padding-top: calc(9 / 16 * 100%);
    content: "";
  }
`;

export const InfoLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 70%;
  height: 70%;

  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 15%);

  @media screen and (max-width: 700px) {
    height: 80%;
  }
`;

export const InfoMetaLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: absolute;
  top: 0;
  left: 5%;
  bottom: 25%;

  width: 45%;
`;

export const TitleWrapper = styled.div`
  position: relative;

  min-height: 8vw;
  margin-bottom: 1.2vw;

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

  padding: 0.5em;

  border: 2px solid rgba(109, 109, 110, 0.7);
  border-radius: 5px;
  background-color: rgba(109, 109, 110, 0.7);

  color: white;
  font-size: 1.5vw;

  cursor: pointer;

  box-shadow: 0px 7px 29px 0px black;

  svg {
    width: 1vw;
    height: 1vw;

    padding: 5px;
    margin-right: 1vw;

    border: 1px solid white;
    border-radius: 50%;
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
