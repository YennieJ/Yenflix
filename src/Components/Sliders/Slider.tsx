import React, { ReactNode, useState } from "react";

import * as S from "./Slider.styled";

interface ISlider {
  children: ReactNode;
}

const Slider = ({ children }: ISlider) => {
  const [sliderHover, setSliderHover] = useState(false);

  const settings = {
    dots: false,

    arrows: true,
    prevArrow: (
      <S.Button pos="left">{sliderHover && <span>&lt;</span>}</S.Button>
    ),
    nextArrow: (
      <S.Button pos="right">{sliderHover && <span>&gt;</span>}</S.Button>
    ),

    // beforeChange: (Index: number, newIndex: any) => {
    //   setIndex(Index);
    //   setCurrentSlide(newIndex);
    // },
    swipe: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <S.Wrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      <S.StyledSlider {...settings}>{children}</S.StyledSlider>
    </S.Wrapper>
  );
};

export default Slider;
