import { Routes, Route } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "@/pages/RegisterPage";
import ErrorState from "@/components/ui/ErrorState";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="*"
        element={
          <ErrorState
            title="no encontrada"
            description="Lo sentimos, no pudimos cargar todas las películas. Es posible que la ruta que haya puesto no exista."
          />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
