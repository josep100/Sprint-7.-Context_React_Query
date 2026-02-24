import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

const MovieSimilarList = ({ idMovie }: { idMovie?: string }) => {
  const { similarMovies, moviesLoading, moviesError, fetchSimilarMovies } =
    useMovies();

  useEffect(() => {
    if (!idMovie) return;

    fetchSimilarMovies(idMovie);
  }, [idMovie]);

  if (moviesLoading) return <p>Cargando...</p>;
  if (moviesError) return <p>{moviesError}</p>;

  return (
    <>
      {similarMovies?.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h3 className="text-2xl font-semibold mb-6">
            Películas similares
          </h3>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-6 pb-4 ">
              {similarMovies.map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} variant="scroll" />
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )} 
    </>
  );
};

export default MovieSimilarList;
