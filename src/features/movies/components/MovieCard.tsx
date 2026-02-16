import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

const MovieCard = ({movie}: {movie: Movie}) => {
    
    const {id, title, poster_path, vote_average, release_date} = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500`+ `${poster_path}`;

    return(
            <Link to={`/movies/${id}`}>
            <article>
                <div>
                    <img src={imageUrl} alt={title} />
                </div>
                <div>
                    <span>{vote_average.toFixed(1)}</span>
                    <h2>{title}</h2>
                    <p>{release_date}</p>
                </div>
            </article>
            </Link>
       
    )
}

export default MovieCard;