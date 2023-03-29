import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { IMovie, getRecommendMovies } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import LoadingSpinner from "Components/LoadingSpinner/LoadingSpinner";

import * as S from "./RecommendMovies.styled";

interface IRecommenMovies {
  clickedMovie: IMovie;
}
const RecommenMovies = ({ clickedMovie }: IRecommenMovies) => {
  const { data: recommendMovie, isLoading } = useQuery<IMovie[]>(
    ["movies", "recommend"],
    () => getRecommendMovies(clickedMovie.id)
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleMoreMovies = () => setIsOpen(!isOpen);

  const emtpyMovie = recommendMovie && recommendMovie.length === 0;
  const overMovies = recommendMovie && recommendMovie.length > 6;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !emtpyMovie && (
          <S.Container>
            <h3>함께 시청된 영화</h3>

            <S.Row isOpen={isOpen} overData={overMovies}>
              {recommendMovie?.map((movie, i) => (
                <S.Box
                  key={i}
                  bgPhoto={movieImgPathFn(movie.backdrop_path, "w300")}
                >
                  <div />
                  <div>
                    <h4>{movie.title}</h4>
                    <p>{movie.overview}</p>
                  </div>
                </S.Box>
              ))}
            </S.Row>
            {overMovies && (
              <S.Openbar isOpen={isOpen}>
                <button onClick={toggleMoreMovies}>
                  <i />
                </button>
              </S.Openbar>
            )}
          </S.Container>
        )
      )}
    </>
  );
};

export default RecommenMovies;
