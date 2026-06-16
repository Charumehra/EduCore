import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return children;

  const role = user.role;

  if (role === "admin") return <Navigate to="/admin/dashboard" />;
  if (role === "instructor") return <Navigate to="/instructor/dashboard" />;

  return <Navigate to="/dashboard" />;
};

export default PublicRoute;