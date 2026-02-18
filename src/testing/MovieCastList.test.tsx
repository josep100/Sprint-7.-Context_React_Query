import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieCastList from "../features/movies/components/MovieCastList";
import useMovies from "../features/movies/hooks/useMovies";

vi.mock("../features/movies/hooks/useMovies", () => ({
  default: vi.fn(),
}));

const mockedUseMovies = vi.mocked(useMovies);

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

describe("MovieCastList", () => {
  const mockCast = [
    {
      id: 1,
      name: "Actor 1",
      character: "Char 1",
      profile_path: "/1.jpg",
      order: 2,
    },
    {
      id: 2,
      name: "Actor 2",
      character: "Char 2",
      profile_path: "/2.jpg",
      order: 0,
    },
    {
      id: 3,
      name: "Actor 3",
      character: "Char 3",
      profile_path: "/3.jpg",
      order: 1,
    },
    {
      id: 4,
      name: "Actor 4",
      character: "Char 4",
      profile_path: "/4.jpg",
      order: 3,
    },
    {
      id: 5,
      name: "Actor 5",
      character: "Char 5",
      profile_path: "/5.jpg",
      order: 4,
    },
    {
      id: 6,
      name: "Actor 6",
      character: "Char 6",
      profile_path: "/6.jpg",
      order: 5,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: {
        id: 123,
        cast: mockCast,
      },
      moviesLoading: true,
      moviesError: null,
      fetchMovieCredits: vi.fn(),
    });

    render(<MovieCastList idMovie="123" />);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: {
        id: 123,
        cast: mockCast,
      },
      moviesLoading: false,
      moviesError: "error al cargar",
      fetchMovieCredits: vi.fn(),
    });

    render(<MovieCastList idMovie="123" />);

    expect(screen.getByText(/error al cargar/i)).toBeInTheDocument();
  });

  it("returns null if MovieCredits is null", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: null,
      moviesLoading: false,
      moviesError: null,
      fetchMovieCredits: vi.fn(),
    });

    const { container } = render(<MovieCastList idMovie="123" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("calls fetchMovieCredits when idMovie is provided", () => {
    const mockFetch = vi.fn();

    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: {
        id: 123,
        cast: mockCast,
      },
      moviesLoading: false,
      moviesError: null,
      fetchMovieCredits: mockFetch,
    });

    render(<MovieCastList idMovie="123" />);

    expect(mockFetch).toHaveBeenCalledWith("123");
  });

  it("renders main cast sorted and limited to 5", () => {
    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: {
        id: 123,
        cast: mockCast,
      },
      moviesLoading: false,
      moviesError: null,
      fetchMovieCredits: vi.fn(),
    });

    render(<MovieCastList idMovie="123" />);

    expect(screen.getByText(/reparto principal/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Actor/i)).toHaveLength(5);

    expect(screen.getByText("Actor 2")).toBeInTheDocument();
  });

  it("does not call fetchMovieCredits if idMovie is undefined", () => {
    const mockFetch = vi.fn();

    mockedUseMovies.mockReturnValue({
      ...baseMock,
      MovieCredits: {
        id: 123,
        cast: mockCast,
      },
      moviesLoading: false,
      moviesError: null,
      fetchMovieCredits: mockFetch,
    });

    render(<MovieCastList />);

    expect(mockFetch).not.toHaveBeenCalled();
  });
});
