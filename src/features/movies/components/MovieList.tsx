import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const { movies, moviesError, moviesLoading, loadMoreMovies } = useMovies();

  if (moviesLoading) return <p>Cargando...</p>;
  if (moviesError) return <p>{moviesError}</p>;

  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} variant="grid" />
      ))}
      <div className="flex justify-center mt-10 col-span-full">
        <button
          onClick={loadMoreMovies}
          disabled={moviesLoading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white disabled:opacity-50 w-full"
        >
          {moviesLoading ? "Cargando..." : "Cargar más"}
        </button>
      </div>
    </>
  );
};

export default MovieList;
