import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/isTokenValid";

function ProtectedRoute({
  children,
}) {
  if (!isTokenValid()) {
    localStorage.removeItem(
      "token"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;