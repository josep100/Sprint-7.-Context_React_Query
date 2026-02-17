import useMovies from "../hooks/useMovies";
import MovieCardCast from "./MovieCardCast";
import { useEffect } from "react";

const MovieCastList = ({ idMovie }: { idMovie?: string }) => {
  const { MovieCredits, moviesError, moviesLoading, fetchMovieCredits } =
    useMovies();

  useEffect(() => {
    if (!idMovie) return;
    fetchMovieCredits(idMovie);
  }, [idMovie]);

  if (moviesLoading) return <p>Cargando...</p>;
  if (moviesError) return <p>{moviesError}</p>;
  if (!MovieCredits) return null;
  const { cast } = MovieCredits;
  const mainCast = cast.sort((a, b) => a.order - b.order).slice(0, 5);
  return (
    <>
      <h2 id="cast-heading" className="text-2xl font-bold mb-4">
        Reparto principal
      </h2>
      <section
        className="flex justify-center gap-6"
        aria-labelledby="cast-heading"
      >
        {mainCast.map(({ id, name, character, profile_path }) => (
          <MovieCardCast
            key={id}
            name={name}
            character={character}
            profile_path={profile_path}
          />
        ))}
      </section>
    </>
  );
};

export default MovieCastList;
