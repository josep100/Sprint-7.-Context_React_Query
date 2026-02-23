import { Routes, Route } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import LoginPage from "@/pages/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      {/* <Route path="*" element={<MoviesPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;

