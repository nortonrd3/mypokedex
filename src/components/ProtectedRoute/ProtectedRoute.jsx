import { Navigate } from "react-router-dom";

function ProtectedRoute({ isSignedIn, children }) {
  return isSignedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;