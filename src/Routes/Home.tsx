import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getPopularMovies,
  IGetMoviesResult,
  getTopRatedMovies,
  getSimilarMovies,
  getRecommendMovies,
  getPlayingNowMovies,
  getTrend,
} from "../api";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utilis";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import RankSlider from "Components/RankSlider/RankSlider";
import TopMovies from "pages/TopMovies";
import TopTv from "pages/TopTv";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  background-color: black;

  overflow-x: hidden;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 85vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const SliderWrapper = styled(motion.div)`
  position: relative;
  top: -100px;

  border: 1px solid red;
`;

const TitleBox = styled.div`
  width: 50%;

  div {
    text-shadow: 2px 2px 6px black;
    :nth-child(1) {
      font-size: 88px;
      font-weight: 600;
    }
    :nth-child(2) {
      font-size: 60px;
      font-weight: 400;
      padding-bottom: 30px;
    }
  }

  button {
    box-shadow: 0px 7px 29px 0px black;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;

    background-color: rgba(109, 109, 110, 0.7);
    padding: 10px 25px;

    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: baseline;

    div {
      width: 25px;
      height: 25px;
      border: 1px solid white;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        font-size: 15px;
      }
    }
  }

  margin-bottom: 10vh;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.img`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Home = () => {
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "recommend"],
  //   getRecommendMovies
  // );

  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "similar"],
  //   getSimilarMovies
  // );

  //오늘의 콘텐츠
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "playNow"],
    getPlayingNowMovies
  );

  //랜덤 배너.. 이게 최선인가?
  const nums = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const movieIndex = Math.floor(Math.random() * nums.length);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => navigate("/");

  // const clickedMovie =
  //   moviePathMatch?.params.id &&
  //   data?.results.find(
  //     (movie) => String(movie.id) === moviePathMatch?.params.id
  //   );

  return (
    <>
      <Wrapper>
        {" "}
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(
                data?.results[movieIndex].backdrop_path || ""
              )}
            >
              <TitleBox>
                <div>
                  <div> {data?.results[movieIndex].title.split(":")[0]}</div>
                  <div>{data?.results[movieIndex].title.split(":")[1]}</div>
                </div>
                <button>
                  <div>
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  상세 정보
                </button>
              </TitleBox>

              {/* <Overview>{data?.results[0].overview}</Overview> */}
            </Banner>

            {/* <SliderWrapper> */}
            <TopMovies />
            {/* 한국 tv가 없음; */}
            {/* <TopTv /> */}
            {/* {popular && (
                <>
                  <h1>인기 영화</h1>
                  <Slider data={popular} />
                </>
              )} */}
            {/* </SliderWrapper> */}
            {/* <AnimatePresence>
              {moviePathMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  ></Overlay>
                  <BigMovie layoutId={moviePathMatch.params.id}>
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence> */}
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
