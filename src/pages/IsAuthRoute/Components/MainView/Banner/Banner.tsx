import React, { useEffect, useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";

import { getPlayingNowMovies, IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";

import * as S from "./Banner.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [movie, setMovie] = useState<IMovie>();

  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");
  const clickedMovie = movie?.id + "" === moviePathMatch?.params.id;

  useEffect(() => {
    fetchData();
  }, []);

  const onBoxClicked = (movieId?: number) => {
    navigate(`/browse/movies/${movieId}`, {
      state: { layoutId: movieId + "" },
    });
  };

  const fetchData = async () => {
    const data = await getPlayingNowMovies();
    const banner =
      data.results[Math.floor(Math.random() * data.results.length)];
    setMovie(banner);
  };

  return (
    <S.BannerWrapper className="BannerWrapper">
      <S.Img className="Img" Img={movieImgPathFn(movie?.backdrop_path || "")} />
      {movie && (
        <S.InfoLayer className="InfoLayer">
          <S.InfoMetaLayer className="InfoMetaLayer">
            <S.TextMetaLayer className="TextMetaLayer">
              <S.TitleWrapper className="TitleWrapper">
                <div> {movie.title.split(":")[0]}</div>
                <div>{movie.title.split(":")[1]}</div>
              </S.TitleWrapper>
              <S.BigMovieButton
                className="BigMovieButton"
                layoutId={movie.id + ""}
                onClick={() => onBoxClicked(movie.id)}
              >
                <FontAwesomeIcon icon={faInfo} />
                상세 정보
              </S.BigMovieButton>
            </S.TextMetaLayer>
          </S.InfoMetaLayer>
        </S.InfoLayer>
      )}

      {clickedMovie && movie && <BigMovie clickedMovie={movie} />}
    </S.BannerWrapper>
  );
};

export default Banner;

{
}
