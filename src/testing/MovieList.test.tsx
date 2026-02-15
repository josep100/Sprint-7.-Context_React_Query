import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieList from "../features/movies/components/MovieList";
import type { Movie } from "../features/movies/types/movie";
import useMovies from "../features/movies/hooks/useMovies";

// 👇 Mockeamos el hook completo
vi.mock("../features/movies/hooks/useMovies");

// 👇 Creamos una versión tipada del mock
const mockedUseMovies = vi.mocked(useMovies);

describe("MovieList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading when moviesLoading is true", () => {
    mockedUseMovies.mockReturnValue({
        movies: [],
        moviesError: null,
        moviesLoading: true,
        selectedMovie: null,
        MovieCredits: null,
        similarMovies: [],
        fetchMovie: async () => {},
        fetchMovieCredits: async () => {},
        fetchSimilarMovies: async () => {},
    });

    render(<MovieList />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows error message when moviesError exists", () => {
    mockedUseMovies.mockReturnValue({
        movies: [],
        moviesError: "Error al cargar películas",
        moviesLoading: false,
        selectedMovie: null,
        MovieCredits: null,
        similarMovies: [],
        fetchMovie: async () => {},
        fetchMovieCredits: async () => {},
        fetchSimilarMovies: async () => {},
    });

    render(<MovieList />);

    expect(screen.getByText("Error al cargar películas")).toBeInTheDocument();
  });

  it("renders MovieCard components when movies exist", () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: "Interstellar",
        overview: "desc",
        poster_path: "/poster.jpg",
        vote_average: 8.5,
        release_date: "2014-11-07",
      },
    ];

    mockedUseMovies.mockReturnValue({
        movies: mockMovies,
        moviesError: null,
        moviesLoading: false,
        selectedMovie: null,
        MovieCredits: null,
        similarMovies: [],
        fetchMovie: async () => {},
        fetchMovieCredits: async () => {},
        fetchSimilarMovies: async () => {},
    });

    render(<MovieList />);

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });
});