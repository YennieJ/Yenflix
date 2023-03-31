import React from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPopularMovies, IGetMoviesResult } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import LoadingSlider from "Components/Sliders/LoadingSlider";
import Slider from "Components/Sliders/Slider";
import BigMovie from "Components/BigMovie/BigMovie";
import Info from "Components/Info/Info";
import rankNumber from "Components/Sliders/RanksNumber";

import * as S from "./TopMovies.styled";

const TopMovies = () => {
  //인기 영화
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopularMovies
  );
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  const onBoxClicked = (movieId: number) => {
    navigate(`/browse/movies/${movieId}`);
    document.body.style.overflow = "clip";
  };

  const movieVariants = {
    hover: {
      zIndex: 3,
      scaleX: 1.3,
      scaleY: 1.6,
      transition: {
        delay: 0.3,
        duaration: 0.1,
        type: "spring",
      },
    },
  };
  const infoMotion = {
    rest: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duaration: 0.1,
        type: "spring",
      },
    },
  };

  return (
    <S.Wrapper>
      <h2>오늘 대한민국의 TOP 10 영화</h2>

      {isLoading ? (
        <LoadingSlider />
      ) : (
        <>
          {data && (
            <Slider>
              {data.results.slice(0, 10).map((movie, i) => (
                <S.Box
                  variants={movieVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  key={i}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <img src={rankNumber[i]} alt="" />
                  <img src={movieImgPathFn(movie.poster_path, "w500")} alt="" />
                  <S.HoverBox variants={infoMotion}>
                    <img
                      src={movieImgPathFn(movie.backdrop_path, "w500")}
                      alt=""
                    />
                    <Info movie={movie} />
                  </S.HoverBox>
                </S.Box>
              ))}
            </Slider>
          )}
        </>
      )}

      {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
    </S.Wrapper>
  );
};

export default TopMovies;

// + bigMovie가 열렸을때 overflow가  clip이 되면서 가로 사이즈가 달라짐
