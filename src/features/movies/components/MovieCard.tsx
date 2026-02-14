import type { Movie } from "../types/movie";

const MovieCard = ({movie}: {movie: Movie}) => {
    
    const {title, poster_path, vote_average, release_date} = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500`+ `${poster_path}`;

    return(
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
       
    )
}

export default MovieCard;