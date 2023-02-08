import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { makeImagePath } from "../utilis";
import { IGetSearchResult, ISearch } from "api";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
  margin: 20px 0;
  padding: 0 60px;
`;

const Row = styled(motion.div)`
  display: grid;
  column-gap: 6px;
  grid-template-columns: repeat(6, 1fr);

  width: 100%;
  padding-bottom: 70px;
`;

const Box = styled(motion.div)<{ idx: number }>`
  position: relative;

  height: 150px;
  cursor: pointer;

  transform-origin: ${(props) => props.idx === 0 && "center left"};
  transform-origin: ${(props) => props.idx === 5 && "center right"};

  img {
    width: 100%;
    height: 100%;
    transform-origin: top;
    border-radius: 5px;
  }
`;

const Info = styled(motion.div)`
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

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.5,
    scaleY: 2.4,

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
    scaleY: 0.65,

    borderRadius: "5px 5px 0 0",

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data: IGetSearchResult;
  keyword: string | null;
}

const offset = 6;

const SearchSlider = ({ data, keyword }: ISlider) => {
  const navigate = useNavigate();

  const moviesArray = [];

  for (let i = 0; i < data.results.length / offset; i++) {
    const firstIndex = i * offset;
    const imageMovies: ISearch[] = [];
    data.results.map((a) => a.backdrop_path && imageMovies.push(a));

    const movies = imageMovies.slice(firstIndex, firstIndex + offset);

    moviesArray.push(movies);
  }
  // ?keyword=${keyword}
  const onBoxClicked = (movieId: number) => {
    navigate(`/search?keyword=${keyword}/${movieId}`);
  };
  const [detailHover, setDetailHover] = useState(false);

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false}>
        {moviesArray.map((movies, i) => (
          <Row key={i}>
            {movies.map((movie, i) => (
              <Box
                // layoutId={movie.id + ""}
                key={i}
                idx={i}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                // key={movie.id}
                onClick={() => onBoxClicked(movie.id)}
              >
                <motion.img
                  variants={imgVariants}
                  src={makeImagePath(movie.backdrop_path, "w500")}
                />
                <Info variants={infoVariants}>
                  <h4>{movie.name ? movie.name : movie.original_title}</h4>
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
                </Info>
              </Box>
            ))}
          </Row>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};

export default SearchSlider;
