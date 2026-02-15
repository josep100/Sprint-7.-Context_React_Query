import { render, screen } from "@testing-library/react";
import MovieCard from "../features/movies/components/MovieCard";
import type { Movie } from "../features/movies/types/movie";
import { describe, expect, it } from "vitest";



describe("MovieCard", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Interstellar",
    overview: "fgfgfgf",
    poster_path: "/poster.jpg",
    vote_average: 8.5,
    release_date: "2014-11-07",
  };

  it("renders the movie title", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
  });

  it("renders the movie image with correct src", () => {
    render(<MovieCard movie={mockMovie} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );
  });

  it("renders the vote average", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("renders the release date", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("2014-11-07")).toBeInTheDocument();
  });
});