import React from "react";
import { Navigate, PathMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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

// interface IDetailPage{
//   movies:
// }

const DetailPage = () => {
  const navigate = useNavigate();
  // const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

  // const onBoxClicked = (movieId: number) => {
  //   Navigate(`/movies/${movieId}`);
  // };

  // const onOverlayClick = () => navigate("/");

  // const clickedMovie =
  //   moviePathMatch?.params.id &&
  //   data?.results.find(
  //     (movie) => String(movie.id) === moviePathMatch?.params.id
  //   );

  return (
    <AnimatePresence>
      {/* {moviePathMatch ? (
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
      ) : null} */}
    </AnimatePresence>
  );
};

export default DetailPage;
