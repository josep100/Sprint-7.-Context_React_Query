import type { MoviesResponse } from '../types/movies-response';
import type { MovieDetail } from '../types/movie-detail';
import type { MovieCredits } from '../types/movie-credits';
import { tmdbFetch } from './tmdbClient';

export const getMovies = () => {
  return tmdbFetch<MoviesResponse>(
    '/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc'
  );
};

export const getMovieById = (movieId: string) => {
  return tmdbFetch<MovieDetail>(`/movie/${movieId}?language=es-ES`);
};

export const getMovieCredits = (movieId: string) => {
  return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits`);
};

export const getSimilarMovies = (movieId: string) => {
  return tmdbFetch<MoviesResponse>(`/movie/${movieId}/similar?language=es-ES`);
};

// https://api.themoviedb.org/3/movie/{movie_id}
// https://api.themoviedb.org/3/movie/{movie_id}/credits
// https://api.themoviedb.org/3/movie/{movie_id}/similar
// getMovieCredits(id)
// getSimilarMovies(id)