import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { username, password });
    navigate("/login");
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">Register</h3>
      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
