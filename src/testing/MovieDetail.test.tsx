// MovieDetail.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieDetail from "../features/movies/components/MovieDetail";
import useMovies from "../features/movies/hooks/useMovies";

// Mockeamos el hook
vi.mock("../features/movies/hooks/useMovies");
const mockUseMovies = useMovies as unknown as vi.Mock;


// Datos de ejemplo de una película
const mockMovie = {
  title: "Inception",
  overview: "A thief who steals corporate secrets...",
  poster_path: "/poster.jpg",
  backdrop_path: "/banner.jpg",
  release_date: "2010-07-16",
  runtime: 148,
  vote_average: 8.8,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Sci-Fi" }
  ]
};

describe("MovieDetail", () => {
  it("renders loading state", () => {
    mockUseMovies.mockReturnValue({
      selectedMovie: null,
      fetchMovie: vi.fn(),
      moviesError: null,
      moviesLoading: true
    });

    render(<MovieDetail idMovie="123" />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseMovies.mockReturnValue({
      selectedMovie: null,
      fetchMovie: vi.fn(),
      moviesError: "Error al cargar",
      moviesLoading: false
    });

    render(<MovieDetail idMovie="123" />);
    expect(screen.getByText(/error al cargar/i)).toBeInTheDocument();
  });

  it("renders movie data correctly", () => {
    mockUseMovies.mockReturnValue({
      selectedMovie: mockMovie,
      fetchMovie: vi.fn(),
      moviesError: null,
      moviesLoading: false
    });

    render(<MovieDetail idMovie="123" />);
    expect(screen.getByRole("heading", { name: /inception/i })).toBeInTheDocument();
    expect(screen.getByText("Action, Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("148 min")).toBeInTheDocument();
    expect(screen.getByText(/a thief who steals corporate secrets/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/puntuación: 8.8 sobre 10/i)).toBeInTheDocument();
  });

  it("shows fallback when runtime is null", () => {
    mockUseMovies.mockReturnValue({
      selectedMovie: { ...mockMovie, runtime: null },
      fetchMovie: vi.fn(),
      moviesError: null,
      moviesLoading: false
    });

    render(<MovieDetail idMovie="123" />);
    expect(screen.getByText(/duración no disponible/i)).toBeInTheDocument();
  });

  it("calls fetchMovie when idMovie changes", () => {
    const fetchMovieMock = vi.fn();

    mockUseMovies.mockReturnValue({
      selectedMovie: null,
      fetchMovie: fetchMovieMock,
      moviesError: null,
      moviesLoading: false
    });

    render(<MovieDetail idMovie="123" />);
    expect(fetchMovieMock).toHaveBeenCalledWith("123");
  });
});