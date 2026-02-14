import MovieList from "../features/movies/components/MovieList"
import ContainerMovies from "../components/layout/ContainerMovies";

const MoviesPage = () => {
    return(
        <ContainerMovies>
            <MovieList />
        </ContainerMovies>
    )
}

export default MoviesPage;