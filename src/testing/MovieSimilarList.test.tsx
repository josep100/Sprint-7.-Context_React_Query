import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieSimilarList from "../features/movies/components/MovieSimilarList";
import useMovies from "../features/movies/hooks/useMovies";

vi.mock("../features/movies/hooks/useMovies", () => ({
  default: vi.fn(),
}));

vi.mock("../features/movies/components/MovieCard", () => ({
  default: ({ movie }: any) => (
    <div data-testid="movie-card">{movie.title}</div>
  ),
}));

const mockedUseMovies = vi.mocked(useMovies);

describe("MovieSimilarList", () => {
  const baseMock: ReturnType<typeof useMovies> = {
    movies: [],
    selectedMovie: null,
    MovieCredits: null,
    similarMovies: [],
    moviesLoading: false,
    moviesError: null,
    fetchMovie: vi.fn(),
    fetchMovieCredits: vi.fn(),
    fetchSimilarMovies: vi.fn(),
  };

  const mockSimilarMovies = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
  ] as any; // ajusta al tipo real Movie

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      moviesLoading: true,
    });

    render(<MovieSimilarList idMovie="123" />);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      moviesError: "Error al cargar",
    });

    render(<MovieSimilarList idMovie="123" />);

    expect(screen.getByText(/error al cargar/i)).toBeInTheDocument();
  });

  it("calls fetchSimilarMovies when idMovie is provided", () => {
    const mockFetch = vi.fn();

    mockedUseMovies.mockReturnValue({
      ...baseMock,
      similarMovies: mockSimilarMovies,
      fetchSimilarMovies: mockFetch,
    });

    render(<MovieSimilarList idMovie="123" />);

    expect(mockFetch).toHaveBeenCalledWith("123");
  });

  it("does not call fetchSimilarMovies when idMovie is undefined", () => {
    const mockFetch = vi.fn();

    mockedUseMovies.mockReturnValue({
      ...baseMock,
      similarMovies: mockSimilarMovies,
      fetchSimilarMovies: mockFetch,
    });

    render(<MovieSimilarList />);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("renders similar movies correctly", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      similarMovies: mockSimilarMovies,
    });

    render(<MovieSimilarList idMovie="123" />);

    expect(screen.getByText(/películas similares/i)).toBeInTheDocument();

    // Aquí asumimos que MovieCard renderiza el título
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
