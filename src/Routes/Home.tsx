import { useQuery } from "@tanstack/react-query";
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
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import { url } from "inspector";

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

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
`;

const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  padding: 0 40px;

  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);

  position: absolute;
  width: 100%;
`;

const IconBox = styled.div`
  position: absolute;

  height: 200px;
  width: 40px;
  background-color: rgba(0, 0, 0, 0.7);

  font-size: 40px;
  font-weight: 400;

  z-index: 999999;
`;

const PrevButton = styled(IconBox)`
  left: 0;
`;

const NextButt = styled(IconBox)`
  right: 0;
`;

const Icon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  cursor: pointer;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: #fff;
  background-size: cover;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
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

//leaving이 true일때 nextbutton을 누르면 초기 애니매이션이 prevbutton누르는것 처럼 작동함
const rowVariants = {
  hidden: (leaving: boolean) => ({
    x: leaving ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (leaving: boolean) => ({
    x: leaving ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    // y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const iconVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
  },
};
const offset = 6;

const Home = () => {
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "nowPlaying"],
  //   getPlayingNowMovies
  // );

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

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "review"],
    getTrend
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hover, setHover] = useState(false);

  console.log(leaving);
  const increaseIndex = () => {
    if (data) {
      setLeaving(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      setLeaving(true);

      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  return (
    <>
      <Wrapper>
        {" "}
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].name}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider
              onHoverStart={() => {
                setHover(true);
              }}
              onHoverEnd={() => {
                setHover(false);
              }}
            >
              <h1>오늘의 콘텐츠</h1>
              {hover && (
                <>
                  <PrevButton onClick={decreaseIndex}>
                    <Icon variants={iconVariants} whileHover="hover">
                      &lt;
                    </Icon>
                  </PrevButton>
                  <NextButt onClick={increaseIndex}>
                    <Icon variants={iconVariants} whileHover="hover">
                      &gt;
                    </Icon>
                  </NextButt>
                </>
              )}

              <AnimatePresence
                initial={false}
                // onExitComplete={toggleLeaving}
                custom={leaving}
              >
                <Row
                  custom={leaving}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  // transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClicked(movie.id)}
                        key={movie.id}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <Info variants={infoVariants}>
                          {movie.name ? movie.name : movie.title}
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
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
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;
