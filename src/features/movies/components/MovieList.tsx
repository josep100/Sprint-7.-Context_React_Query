import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const { movies, moviesError, moviesLoading } = useMovies();

    if (moviesLoading) return <p>Cargando...</p>;
    if (moviesError) return <p>{moviesError}</p>;

    return(
        <>
            {
                movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            }
        </>
    );
}

export default MovieList;