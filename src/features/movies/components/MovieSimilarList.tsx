import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

const MovieSimilarList = ({ idMovie }: { idMovie?: string }) => {
  const { similarMovies, moviesLoading, moviesError, fetchSimilarMovies } =
    useMovies();

  useEffect(() => {
    if (!idMovie) return;

    fetchSimilarMovies(idMovie);
  }, [idMovie]);

  if (moviesLoading) return <p>Cargando...</p>;
  if (moviesError) return <p>{moviesError}</p>;

  return (
    <>
      <section className="flex" aria-labelledby="similar-heading">
        <h2 id="similar-heading" className="text-2xl font-bold mb-4">
          Películas similares
        </h2>
        {similarMovies.map((similarMovie) => (
          <MovieCard key={similarMovie.id} movie={similarMovie} />
        ))}
      </section>
    </>
  );
};

export default MovieSimilarList;
