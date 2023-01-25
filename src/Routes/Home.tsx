import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getPlayingNowMovies,
  getPopularMovies,
  IGetMoviesResult,
  getTopRatedMovies,
  getSimilarMovies,
  getRecommendMovies,
  getTrend,
} from "../api";
import React from "react";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utilis";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import Slider from "Components/Slider";

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
  height: 100vh;
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

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
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
  //   ["movies", "popular"],
  //   getPopularMovies
  // );
  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "topRated"],
  //   getTopRatedMovies
  // );

  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "recommend"],
  //   getRecommendMovies
  // );

  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "similar"],
  //   getSimilarMovies
  // );

  //오늘의 콘텐츠
  const { data: trend, isLoading: trendLoaing } = useQuery<IGetMoviesResult>(
    ["movies", "review"],
    getTrend
  );
  //현재 상영중인 영화
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getPlayingNowMovies);

  // increase 와 decrease를 더 깔끔하게 쓸수 있게 하기
  // const paginate = (newDirection: number) => {
  //   setPage([page + newDirection, newDirection]);
  // };

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
        {trendLoaing ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(trend?.results[0].backdrop_path || "")}
            >
              <Title>{trend?.results[0].name}</Title>
              <Overview>{trend?.results[0].overview}</Overview>
            </Banner>
            <SliderWrapper>
              {trend && (
                <>
                  <h1>오늘의 콘텐츠</h1>
                  <Slider data={trend} />
                </>
              )}
              {nowPlaying && (
                <>
                  <h1>현재 상영중인 영화</h1>
                  <Slider data={nowPlaying} />
                </>
              )}
            </SliderWrapper>
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
