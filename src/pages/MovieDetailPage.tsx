import { useParams } from "react-router-dom";
import MovieDetail from "../features/movies/components/MovieDetail";
import MovieCastList from "../features/movies/components/MovieCastList";

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return(
        <>
            <MovieDetail idMovie = {id} />
            <MovieCastList idMovie = {id}/>
        </>
    )
}

export default MovieDetailPage;