import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">Login</h3>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
        <button
        className="btn btn-outline-success w-100 mt-2"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      </form>
    </div>
  );
};

export default Login;
