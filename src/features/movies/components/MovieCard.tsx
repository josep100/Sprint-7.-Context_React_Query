import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import clsx from "clsx";

type MovieCardProps = {
  movie: Movie;
  variant?: "grid" | "scroll";
};

const MovieCard = ({ movie, variant = "grid" }: MovieCardProps) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const isScroll = variant === "scroll";

  const getScoreColor = (score: number) => {
    if (score >= 7) return "border-green-500 text-green-400";
    if (score >= 5) return "border-yellow-500 text-yellow-400";
    return "border-red-500 text-red-400";
  };

  return (
    <Link to={`/movies/${id}`} className="block group">
      <article
        className={clsx(
          "bg-zinc-900 overflow-hidden shadow-md transition-all duration-300",
          {
            "w-full lg:rounded-xl hover:shadow-2xl overflow-hidden hover:-translate-y-1":
              !isScroll,
            "w-44 shrink-0 rounded-lg": isScroll,
          },
        )}
      >
        <div
          className={clsx({
            "flex lg:block": !isScroll,
            block: isScroll,
          })}
        >
          <div
            className={clsx("relative", {
              "w-32 shrink-0 lg:w-full": !isScroll,
              "w-full": isScroll,
            })}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full aspect-2/3 object-cover"
            />

            {!isScroll && (
              <div
                className={clsx(
                  "hidden lg:flex absolute -bottom-6 left-4 w-14 h-14 rounded-full border-4 bg-zinc-950 items-center justify-center text-sm font-bold",
                  getScoreColor(vote_average),
                )}
              >
                {vote_average.toFixed(1)}
              </div>
            )}
          </div>

          <div
            className={clsx({
              "flex flex-col justify-center p-4 lg:pt-10 lg:pb-4 lg:px-4":
                !isScroll,
              "p-3": isScroll,
            })}
          >
            <h2 className="text-white font-semibold text-sm lg:text-lg leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
            <p className="text-zinc-400 text-xs lg:text-sm mt-1">
              {release_date}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
