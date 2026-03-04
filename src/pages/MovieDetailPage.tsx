import { useParams } from "react-router-dom";
import MovieDetail from "../features/movies/components/MovieDetail";
import MovieCastList from "../features/movies/components/MovieCastList";
import MovieSimilarList from "../features/movies/components/MovieSimilarList";
import Navbar from "@/components/layout/Navbar";

const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return(
        <>
            <Navbar />
            <MovieDetail idMovie = {id} />
            <MovieCastList idMovie = {id}/>
            <MovieSimilarList idMovie = {id}/>
        </>
    )
}

export default MovieDetailPage;