const API_KEY = "9489e28a2fc6ec744676ce4363b13ca8";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
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

interface ISearch {
  backdrop_path?: string;
  id: number;
  title: string;
  overview: string;
}
export interface IGetSearchResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

//현재 상영중인 영화
export async function getPlayingNowMovies() {
  const respons = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}

//매일 변하는 오늘의 영화티비쇼
export async function getTrend() {
  const respons = await fetch(`
  ${BASE_PATH}/trending/all/day?api_key=${API_KEY}&language=ko-KR`);
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
export async function getRecommendMovies(movieId: number) {
  const respons = await fetch(
    `${BASE_PATH}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=ko-KR`
  );
  return await respons.json();
}
