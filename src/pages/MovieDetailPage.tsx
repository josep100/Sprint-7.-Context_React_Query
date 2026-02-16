import { useParams } from "react-router-dom";
import MovieDetail from "../features/movies/components/MovieDetail";

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return(
        <>
            <MovieDetail idMovie = {id} />
        </>
    )
}

export default MovieDetailPage;