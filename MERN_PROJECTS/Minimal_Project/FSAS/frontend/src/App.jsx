// react router imports
import { Routes, Route } from "react-router-dom";

// pages import
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// protected route import
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* signup route */}
      <Route path="/signup" element={<Signup />} />

      {/* login route */}
      <Route path="/" element={<Login />} />

      {/* protected dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
