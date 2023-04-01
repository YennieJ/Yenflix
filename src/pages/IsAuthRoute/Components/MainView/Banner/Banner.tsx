import React from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPlayingNowMovies, IMovie } from "service/moviesApi";
import { movieImgPathFn } from "utils/movieImgPathFn";

import BigMovie from "Components/BigMovie/BigMovie";

import * as S from "./Banner.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  // staleTime으로 배너 재로딩 5분텀
  const { data: banner, isLoading } = useQuery<IMovie>(
    ["movie", "banner"],
    () => getPlayingNowMovies(Math.floor(Math.random() * 10)),
    { staleTime: 1000 * 5 }
  );

  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");
  const clickedMovie = banner?.id + "" === moviePathMatch?.params.id;

  const onBoxClicked = (movieId?: number) => {
    navigate(`/browse/movies/${movieId}`);
    document.body.style.overflow = "hidden";
  };

  return (
    <S.BannerWrapper>
      {isLoading ? (
        <S.LoadingBanner />
      ) : (
        banner && (
          <>
            <S.BannerImg Img={movieImgPathFn(banner.backdrop_path || "")} />

            <S.InfoLayer>
              <S.InfoMetaLayer>
                <div>
                  <S.TitleWrapper>
                    <div> {banner.title.split(":")[0]}</div>
                    <div>{banner.title.split(":")[1]}</div>
                  </S.TitleWrapper>
                  <S.BigMovieButton onClick={() => onBoxClicked(banner.id)}>
                    <FontAwesomeIcon icon={faInfo} />
                    상세 정보
                  </S.BigMovieButton>
                </div>
              </S.InfoMetaLayer>
            </S.InfoLayer>
          </>
        )
      )}
      {clickedMovie && banner && <BigMovie clickedMovie={banner} />}
    </S.BannerWrapper>
  );
};

export default Banner;

{
}
