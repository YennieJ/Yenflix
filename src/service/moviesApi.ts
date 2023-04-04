const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  original_title: string;
  original_name: string;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

//현재 상영중인 영화
//Use in MainView > Banner
export async function getPlayingNowMovies(randomNumber: number) {
  const bannerMobvie = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`
  )
    .then((response) => response.json())
    .then((data) => data.results[randomNumber]);

  return await bannerMobvie;
}

//인기영화
//Use in MainView > TopMovies
export async function getPopularMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&region=KR`
  );
  return await respons.json();
}

//매일 변하는 오늘의 영화
//Use in MainView > TodayMovies
export async function getTrend() {
  const respons = await fetch(`
  ${BASE_PATH}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`);
  return await respons.json();
}

//개봉 예정 영화
//Use in MainView > UpcomingMovies
export async function getUpcomingMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  );
  return await respons.json();
}

//검색 영화티비쇼
//Use in SearchView
export async function getSearch(keyword: string) {
  const movies = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  )
    .then((response) => response.json())
    .then((data: IGetMoviesResult) =>
      data.results.filter((movies) => movies.poster_path && movies)
    );

  return movies;
}

//BigMovie에 추천영화
//Use in BigMovie > RecommendMovies
export async function getRecommendMovies(movie: number) {
  const movies = await fetch(
    `${BASE_PATH}/movie/${movie}/recommendations?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((data: IGetMoviesResult) =>
      data.results.filter((movies) => movies.backdrop_path && movies)
    );

  return movies;
}
