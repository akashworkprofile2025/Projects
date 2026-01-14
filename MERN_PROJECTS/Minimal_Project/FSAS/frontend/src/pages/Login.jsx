// react hooks import
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import '../styles/login.css' 

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigation
  const navigate = useNavigate();

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // backend login api
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // token localStorage में save
      // token save
      localStorage.setItem("token", res.data.token);

      // user name save
      localStorage.setItem("name", res.data.name);


      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
<div class="container bg-danger mt-5 pt-5 pb-5 w-25 formbox rounded-5">
    <div class="container">
  <div class="row gx-1 d-flex justify-content-center align-items-center ">
    <div class="col-md-6 text-light d-flex justify-content-center align-items-center">
      <form onSubmit={handleLogin}>
      <h2 class='text-center'>Login</h2>
      <div class="mb-3">
      {/* email */}
      <label for="email" class="form-label">Email</label>
      <input class="form-control"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>             
      {/* password */}
      <div class="mb-3">
      <label for="password" class="form-label">password</label>  
      <input class="form-control"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <div class='text-center'>  
      <button type="submit" class='btn btnconf '>Login</button>
      </div>
    </form>
    </div>

     </div>
   </div>
   
</div>   
       
  );
};

export default Login;
