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
      
      <section 
  className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6" 
  aria-labelledby="cast-heading"
>
  {/* w-full obliga al título a ocupar toda la línea superior */}
  {/* El max-width debe coincidir con el ancho total de tu cuadrícula de fotos para que alineen perfectamente */}
  <div className="w-full flex justify-center mt-4">
    <h2 
      id="cast-heading" 
      className="text-2xl font-bold mb-4 w-full max-w-240 text-center md:text-left" // Ajusta este max-w al ancho de tu grid
    >
      Reparto principal
    </h2>
  </div>

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
