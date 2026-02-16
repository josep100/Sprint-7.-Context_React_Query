import { useEffect } from "react";
import useMovies from "../hooks/useMovies";

const MovieDetail = ({ idMovie }: { idMovie: string }) => {
  const { selectedMovie, fetchMovie, moviesError, moviesLoading } = useMovies();

  useEffect(() => {
    if (!idMovie) return;
    fetchMovie(idMovie);
  }, [idMovie]);

  if (moviesLoading) return <p>Cargando...</p>;
  if (moviesError) return <p>{moviesError}</p>;
  if (!selectedMovie) return null;

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    genres,
  } = selectedMovie;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder.jpg";

  const banner = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : undefined;

  return (
    <section
      className="flex justify-center h-125 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `
      linear-gradient(
        to right,
        rgba(52.5,52.5,31.5,1) calc((50vw - 170px) - 340px),
        rgba(52.5,52.5,31.5,0.84) 50%,
        rgba(52.5,52.5,31.5,0.84) 100%
      ),
      url(${banner})
    `,
      }}
      aria-labelledby="movie-title"
    >
      <article className="flex gap-8 max-w-6xl w-full">
        {/* Poster */}
        <figure>
          <img
            src={poster}
            alt={`Póster de la película ${title}`}
            className="rounded-lg"
          />
        </figure>

        {/* Información */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <header>
            <h2 id="movie-title" className="text-3xl font-bold">
              {title}
            </h2>

            <dl className="flex gap-4 mt-2 text-sm opacity-90">
              <div>
                <dt className="sr-only">Fecha de estreno</dt>
                <dd>{release_date}</dd>
              </div>

              <div>
                <dt className="sr-only">Géneros</dt>
                <dd>{genres.map(({ name }) => name).join(", ")}</dd>
              </div>

              <div>
                <dt className="sr-only">Duración</dt>
                <dd>{runtime ? `${runtime} min` : "Duración no disponible"}</dd>
              </div>
            </dl>
          </header>

          {/* Puntuación */}
          <div aria-label={`Puntuación: ${vote_average.toFixed(1)} sobre 10`}>
            <span className="text-2xl font-semibold">
              ⭐ {vote_average.toFixed(1)}
            </span>
          </div>

          {/* Sinopsis */}
          <section aria-labelledby="overview-title">
            <h3 id="overview-title" className="text-lg font-semibold">
              Sinopsis
            </h3>
            <p className="mt-2 leading-relaxed">{overview}</p>
          </section>
        </div>
      </article>
    </section>
  );
};

export default MovieDetail;
