import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useMovies from "../hooks/useMovies";

const MovieDetail = ({ idMovie }: { idMovie?: string }) => {
  const navigate = useNavigate();

  const {
    selectedMovie,
    fetchMovie,
    fetchSimilarMovies,
    moviesError,
    moviesLoading,
  } = useMovies();

  useEffect(() => {
    if (!idMovie) return;
    fetchMovie(idMovie);
    fetchSimilarMovies(idMovie);
  }, [idMovie]);

  if (moviesLoading) return <p className="text-white p-10">Cargando...</p>;
  if (moviesError) return <p className="text-red-500 p-10">{moviesError}</p>;
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
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : undefined;

  const getScoreColor = (score: number) => {
    if (score >= 7) return "border-green-500 text-green-400";
    if (score >= 5) return "border-yellow-500 text-yellow-400";
    return "border-red-500 text-red-400";
  };

  return (
    <>
    
      <section
        className="relative w-full min-h-137.5 flex items-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
       
        <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/70" />

        
        <Link
          to="/movies"
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white bg-zinc-900/60 backdrop-blur-md px-4 py-2 rounded-full hover:bg-zinc-800 transition duration-300"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Volver</span>
        </Link>

        <article className="relative z-10 flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto px-6 py-14 w-full">
          {/* Poster */}
          <figure className="shrink-0">
            <img
              src={poster}
              alt={`Póster de ${title}`}
              className="w-[320px] rounded-xl shadow-2xl"
            />
          </figure>

          
          <div className="flex flex-col  gap-8 text-white">
            <header>
              <h2 className="text-4xl font-bold">{title}</h2>

              <p className="mt-2 text-sm text-zinc-300">
                {release_date} • {runtime} min •{" "}
                {genres.map((g) => g.name).join(", ")}
              </p>
            </header>

            
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full border-4 bg-zinc-900 flex items-center justify-center text-lg font-bold ${getScoreColor(
                  vote_average
                )}`}
              >
                {vote_average.toFixed(1)}
              </div>

              <span className="text-sm font-medium">
                Puntuación de usuario
              </span>
            </div>

            
            <section>
              <h3 className="text-xl font-semibold">Sinopsis</h3>
              <p className="mt-3 text-zinc-200 leading-relaxed max-w-3xl">
                {overview}
              </p>
            </section>
          </div>
        </article>
      </section>
    </>
  );
};

export default MovieDetail;