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

  const [page, setPage] = useState(1); // 👈 nuevo
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  // 🔥 función reutilizable
  const fetchMovies = async (pageNumber: number) => {
    try {
      setMoviesLoading(true);

      const res = await getMovies(pageNumber);

      setMovies(prev => [...prev, ...res.results]); // 👈 acumulamos

    } catch (err) {
      setMoviesError("Error al cargar películas");
    } finally {
      setMoviesLoading(false);
    }
  };

  // 🔥 primera carga
  useEffect(() => {
    fetchMovies(1);
  }, []);

  // 🔥 botón cargar más
  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  // ---------- DETALLE ----------
  const fetchMovie = async (idMovie?: string) => {
    try {
      setMoviesLoading(true);
      const res = await getMovieById(idMovie);
      setSelectedMovie(res);
    } catch {
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
    } catch {
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
    } catch {
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
    loadMoreMovies, // 👈 exportamos
  };
};

export default useMovies;