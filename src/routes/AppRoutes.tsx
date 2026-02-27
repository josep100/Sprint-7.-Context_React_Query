import { Routes, Route } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "@/pages/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
