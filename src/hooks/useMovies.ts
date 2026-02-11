import { useState, useEffect } from "react";
import {
  getMovies,
  getMovieById,
  getMovieCredits,
  getSimilarMovies,
} from "../services/tmdb.service";
import type { Movie } from "../types/movie";
import type { MovieDetail } from "../types/movie-detail";
import type { MovieCredits } from "../types/movie-credits";

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [MovieCredits, setMovieCredits] = useState<MovieCredits | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setMoviesLoading(true);
        const res = await getMovies();
        setMovies(res.results);
      } catch (err) {
        setMoviesError("Error al cargar películas");
      } finally {
        setMoviesLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const fetchMovie = async (idMovie: string) => {
    try {
      setMoviesLoading(true);
      const res = await getMovieById(idMovie);
      setSelectedMovie(res);
    } catch (error) {
      setMoviesError("Error al cargar detalle de la película");
    } finally {
      setMoviesLoading(false);
    }
  };

  const fetchMovieCredits = async (id: string) => {
    try {
      setMoviesLoading(true);
      const credits = await getMovieCredits(id);
      setMovieCredits(credits);
    } catch (err) {
      setMoviesError("Error al cargar los créditos");
    } finally {
      setMoviesLoading(false);
    }
  };

  const fetchSimilarMovies = async (id: string) => {
    try {
      setMoviesLoading(true);
      const similar = await getSimilarMovies(id);
      setSimilarMovies(similar.results);
    } catch (err) {
      setMoviesError("Error al cargar películas similares");
    } finally {
      setMoviesLoading(false);
    }
  };

  return {
    movies,
    selectedMovie,
    MovieCredits,
    similarMovies,
    moviesLoading,
    moviesError,
    fetchMovie,
    fetchMovieCredits,
    fetchSimilarMovies,
  };
};

export default useMovies;
