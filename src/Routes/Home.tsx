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
import { makeImagePath } from "../utilis";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import TopMovies from "pages/TopMovies";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BigMovie from "Components/BigMovie/BigMovie";

const Wrapper = styled.div`
  background-color: black;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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

const Home = () => {
  //오늘의 콘텐츠
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "playNow"],
    getPlayingNowMovies
  );

  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");
  const clickedMovie =
    moviePathMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === moviePathMatch?.params.id
    );

  const onBoxClicked = (movieId?: number) => {
    navigate(`/movies/${movieId}`);
  };
  console.log(data);
  // const { data, isLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "similar"],
  //   getSimilarMovies
  // );

  //랜덤 배너.. 이게 최선인가?
  const nums = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const movieIndex = Math.floor(Math.random() * nums.length);

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
                <button
                  onClick={() => onBoxClicked(data?.results[movieIndex].id)}
                >
                  <div>
                    <FontAwesomeIcon icon={faInfo} />
                  </div>
                  상세 정보
                </button>
              </TitleBox>
            </Banner>

            <TopMovies />
            {/* 한국 tv가 없음; */}
            {/* <TopTv /> */}
          </>
        )}
        {clickedMovie && <BigMovie clickedMovie={clickedMovie} />}
      </Wrapper>
    </>
  );
};

export default Home;
