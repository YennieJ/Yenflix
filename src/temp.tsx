import React, { useRef, useState } from "react";

import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { IGetMoviesResult } from "service/moviesApi";

import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";
import rankNumber from "./Components/Sliders/RankSlide/RanksNumber";

// import * as S from "./temp.styled";
// import { AnimatePresence, motion } from "framer-motion";
// import rankNumber from "Components/Sliders/RankSlide/RanksNumber";

import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const SampleWrapper = styled(motion.div)`
  border: 1px solid red;
  position: relative;
  padding: 0 4%;
`;

const Box = styled(motion.div)`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 0.2vw;

  width: 16.66666667%;
  img:nth-child(1) {
    width: 80%;
    height: 100%;
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

const StyledSlider = styled(Slider)`
  .slick-prev:before,
  .slick-next:before,
  .slick-arrow {
    display: none !important;
  }
`;

const ButtonBox = styled.button`
  position: absolute;

  /* height: 180px; */
  width: 4%;
  border: none;

  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 1;

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    cursor: pointer;
    color: ${(props) => props.theme.white.lighter};
  }
`;

const PrevButton = styled(ButtonBox)`
  left: 0;
`;

const NextButton = styled(ButtonBox)`
  right: 0;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.3,
    scaleY: 1.6,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
    display: "none",

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const scaleImgVariants = {
  hover: {
    display: "block",
    // scaleY: 0.65,
    borderRadius: "5px 5px 0 0",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data: IGetMoviesResult;
}

const Temp = ({ data }: ISlider) => {
  const [sliderHover, setSliderHover] = useState(false);
  const sliderRef = useRef<any>(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    prevArrow: <PrevButton />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  //index를 쓴 이유는 고유한 키값이 필요한대 나는 무한 슬라이드를 위해서 뒷쪽에 데이터가 더 있었끼때문에
  const onBoxClicked = (movieId: number, i: string) => {
    navigate(`/browse/movies/${movieId}`, { state: { layoutId: i } });
  };

  return (
    <SampleWrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <PrevButton onClick={() => sliderRef?.current?.slickPrev()}>
        {sliderHover && <span>&lt;</span>}
      </PrevButton>
      <NextButton onClick={() => sliderRef?.current?.slickNext()}>
        {sliderHover && <span>&gt;</span>}
      </NextButton>
      <StyledSlider {...settings} ref={sliderRef}>
        {data?.results.slice(0, 10).map((movie, i) => (
          <Box
          // variants={boxVariants}
          // initial="normal"
          // whileHover="hover"
          // key={i}
          // onClick={() => onBoxClicked(movie.id, i + "")}
          // layoutId={i + ""}
          >
            <img src={rankNumber[i]} alt="" />
            <motion.img
              variants={imgVariants}
              src={movieImgPathFn(movie.poster_path, "w500")}
              alt=""
            />
            {/* <motion.img
              variants={scaleImgVariants}
              src={movieImgPathFn(movie.backdrop_path, "w500")}
              alt=""
            />
            <Info movie={movie} /> */}
          </Box>
        ))}
      </StyledSlider>
      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </SampleWrapper>
  );
};

export default Temp;
