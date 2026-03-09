import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieDetail from "../features/movies/components/MovieDetail";
import useMovies from "../features/movies/hooks/useMovies";
import { MemoryRouter } from "react-router-dom";

vi.mock("../features/movies/hooks/useMovies");
const mockUseMovies = useMovies as unknown as ReturnType<typeof vi.fn>;


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
      fetchSimilarMovies: vi.fn(),
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
      fetchSimilarMovies: vi.fn(),
      moviesError: "Error al cargar",
      moviesLoading: false
    });

    render(
        <MemoryRouter>
        <MovieDetail idMovie="123" />
        </MemoryRouter>
      );
    expect(screen.getByRole("alert")).toHaveTextContent(/lo sentimos/i);
  });

  it("renders movie data correctly", () => {
    mockUseMovies.mockReturnValue({
      selectedMovie: mockMovie,
      fetchMovie: vi.fn(),
      fetchSimilarMovies: vi.fn(),
      moviesError: null,
      moviesLoading: false
    });

    render(
        <MemoryRouter>
        <MovieDetail idMovie="123" />
        </MemoryRouter>
      );
    expect(screen.getByRole("heading", { name: /inception/i })).toBeInTheDocument();
    expect(screen.getByText(/Action, Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/148 min/i)).toBeInTheDocument();
    expect(screen.getByText(/a thief who steals corporate secrets/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/puntuación: 8.8 sobre 10/i)).toBeInTheDocument();
  });

  it("calls fetchMovie when idMovie changes", () => {
    const fetchMovieMock = vi.fn();

    mockUseMovies.mockReturnValue({
      selectedMovie: null,
      fetchMovie: fetchMovieMock,
      fetchSimilarMovies: vi.fn(),
      moviesError: null,
      moviesLoading: false
    });

    render(<MovieDetail idMovie="123" />);
    expect(fetchMovieMock).toHaveBeenCalledWith("123");
  });
});