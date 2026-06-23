import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Mientras se verifica la sesión
  if (loading) {
    return <h2>Cargando...</h2>;
  }

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, muestra la ruta solicitada
  return <Outlet />;
}