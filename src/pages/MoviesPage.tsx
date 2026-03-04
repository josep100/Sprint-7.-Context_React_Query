import MovieList from "../features/movies/components/MovieList";
import ContainerMovies from "../components/layout/ContainerMovies";
import Navbar from "@/components/layout/Navbar";

const MoviesPage = () => {
  return (
    <>
      <Navbar />
      <ContainerMovies>
        <MovieList />
      </ContainerMovies>
    </>
  );
};

export default MoviesPage;
