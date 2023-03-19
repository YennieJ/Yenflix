import React, { useEffect, useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

import { getPlayingNowMovies, IMovie } from "service/moviesApi";

import TopMovies from "pages/TopMovies";
import BigMovie from "Components/BigMovie/BigMovie";

import { movieImgPathFn } from "utils/movieImgPathFn";

import styled from "styled-components";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion } from "framer-motion";

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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

const TitleBox = styled.div`
  /* width: 50%; */

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
    display: flex;
    justify-content: center;
    align-items: baseline;

    border: 2px solid rgba(109, 109, 110, 0.7);
    border-radius: 5px;
    padding: 10px 25px;

    font-size: 20px;
    color: white;
    background-color: rgba(109, 109, 110, 0.7);

    cursor: pointer;

    box-shadow: 0px 7px 29px 0px black;

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
    :hover {
      border: 2px solid rgba(109, 109, 110, 0.5);
      background-color: rgba(109, 109, 110, 0.5);
    }
    :active {
      border: 2px solid white;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  margin-bottom: 10vh;
`;

const BoxOne = styled.div`
  width: 100%;
  background-position: center;
  background-size: cover;
  ::after {
    content: "";
    display: block;
    padding-top: calc(9 / 16 * 100%);
  }
`;

const Row = styled.div`
  width: 100%;
  ::after {
    content: "";
    display: block;
    clear: both;
  }
`;
const Cell = styled.div`
  float: left;
  box-sizing: border-box;
  width: 100%;
`;
const ImgBox = styled.div<{ Img: string }>`
  background-position: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.Img});
  ::after {
    content: "";
    display: block;
    padding-top: calc(9 / 16 * 100%);
  }
`;

const Home = () => {
  const [movie, setMovie] = useState<IMovie>();

  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null =
    useMatch("/browse/movies/:id");
  const clickedMovie = movie?.id + "" === moviePathMatch?.params.id;
  // moviePathMatch?.params.id &&
  // data?.results.find(
  //   (movie) => String(movie.id) === moviePathMatch?.params.id
  // );

  useEffect(() => {
    fetchData();
  }, []);

  // ?지우기
  const onBoxClicked = (movieId?: number) => {
    navigate(`/browse/movies/${movieId}`, {
      state: { layoutId: movieId + "" },
    });
  };

  //reactQuery를 사용하지 않을때
  const fetchData = async () => {
    const data = await getPlayingNowMovies();
    const banner =
      data.results[Math.floor(Math.random() * data.results.length)];

    setMovie(banner);
  };

  //react query를 사용할때
  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "similar"],
  //   getSimilarMovies
  // );

  //오늘의 베ㄴ
  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "playNow"],
  //   getPlayingNowMovies
  // );

  //랜덤 배너.. 이게 최선인가?
  // const nums = [
  //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  // ];
  // const movieIndex = Math.floor(Math.random() * nums.length);
  // const clickedMovie =
  // moviePathMatch?.params.id &&
  // data?.results.find(
  //   (movie) => String(movie.id) === moviePathMatch?.params.id
  // );

  return (
    <>
      {/* <Wrapper>
        {movie && (
          <>
            <Banner bgPhoto={movieImgPathFn(movie.backdrop_path || "")}>
            </Banner>
            <TopMovies />
          </>
        )}

        {clickedMovie && movie && <BigMovie clickedMovie={movie} />}
      </Wrapper> */}

      <BoxOne>
        <Row>
          <Cell>
            <ImgBox Img={movieImgPathFn(movie?.backdrop_path || "")}></ImgBox>
          </Cell>
        </Row>
      </BoxOne>
    </>
  );
};

export default Home;
