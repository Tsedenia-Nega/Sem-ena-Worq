import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import your hook

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Wait for the /me request to finish
  if (loading) return <div>Loading...</div>;

  // If check is done and no user, redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;