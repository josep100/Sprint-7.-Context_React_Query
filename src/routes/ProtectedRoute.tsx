import { Navigate , Outlet} from "react-router-dom";
import { useAuthContext } from "@/features/auth/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">
      <p>Cargando...</p>
    </div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

    return <Outlet />;
};

export default ProtectedRoute;