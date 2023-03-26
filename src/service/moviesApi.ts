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
export async function getPlayingNowMovies(randomNumber: number) {
  const respons = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`
  )
    .then((data) => data.json())
    .then((movies) => movies.results[randomNumber]);

  return await respons;
}

//매일 변하는 오늘의 영화
export async function getTrend() {
  const respons = await fetch(`
  ${BASE_PATH}/trending/movie/day?api_key=${API_KEY}&language=ko-KR`);
  return await respons.json();
}

//검색 영화티비쇼
export async function getSearch(keyword: string) {
  const respons = await fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`
  );
  return await respons.json();
}

//인기영화
export async function getPopularMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&region=KR`
  );
  return await respons.json();
}

//인기드라마
export async function getPopularTv() {
  const respons = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}

//최신 영화
export async function getLatestMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/latest?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}

//역대 top movies
export async function getTopRatedMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}

//검색하면 나오는 비슷한 장르영화
export async function getSimilarMovies(movieId: number) {
  const respons = await fetch(
    `${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}

//화면 클릭하면 나오는 검색한 내용 위주에 추천영화
export async function getRecommendMovies(movie: number) {
  const data = await fetch(
    `${BASE_PATH}/movie/${movie}/recommendations?api_key=${API_KEY}&language=ko-KR`
  )
    .then((response) => response.json())
    .then((movies: IGetMoviesResult) =>
      movies.results.filter((movie) => movie.backdrop_path && movie)
    );

  return data;
}
