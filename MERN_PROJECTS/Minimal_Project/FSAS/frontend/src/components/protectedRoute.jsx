// navigate import
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // localStorage से token check
  const token = localStorage.getItem("token");

  // अगर token नहीं है तो login page भेज दो
  if (!token) {
    return <Navigate to="/" />;
  }

  // token है तो page दिखाओ
  return children;
};

export default ProtectedRoute;
