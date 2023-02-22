import React, { useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { IMovie } from "service/moviesApi";

const Wrapper = styled(motion.div)`
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
  opacity: 0;

  h4 {
    font-size: 15px;
    font-weight: 700;
  }
`;
const StarRate = styled.div<{ rate: number }>`
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

const DetailBox = styled.div`
  position: absolute;
  right: -5px;
  bottom: 7px;

  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DatailBtn = styled(motion.button)`
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
const Ballon = styled(motion.div)`
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

const infoVariants = {
  hover: {
    opacity: 1,
    zIndex: 3,

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface IInfo {
  movie: IMovie;
}

const Info = ({ movie }: IInfo) => {
  const [detailHover, setDetailHover] = useState(false);

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };

  const movieTitle = () => {
    const checkKR = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
    const checkEN = /[a-zA-Z]/; //영어

    const title = movie.title;
    const originName = movie.original_name;
    const originTitle = movie.original_title;

    if (checkKR.test(title)) {
      return title;
    } else if (checkKR.test(originName)) {
      return originName;
    } else if (checkEN.test(originTitle)) {
      return originTitle;
    } else {
      return title;
    }
  };

  return (
    <Wrapper variants={infoVariants}>
      <h4>{movieTitle()}</h4>
      <StarRate rate={starRate(movie.vote_average)}>
        <div>
          <span>★★★★★</span>
          <span>☆☆☆☆☆</span>
        </div>
        <div> {movie.vote_average.toFixed(1)} </div>
      </StarRate>
      <DetailBox>
        {detailHover && <Ballon>상세 정보</Ballon>}
        <DatailBtn
          onHoverStart={() => {
            setDetailHover(true);
          }}
          onHoverEnd={() => {
            setDetailHover(false);
          }}
        >
          <i />
        </DatailBtn>
      </DetailBox>
    </Wrapper>
  );
};

export default Info;
