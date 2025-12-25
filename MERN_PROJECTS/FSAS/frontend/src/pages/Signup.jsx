// react hooks import
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';

const Signup = () => {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // page redirect hook
  const navigate = useNavigate();

  // signup function
  const handleSignup = async (e) => {
    e.preventDefault(); // page reload stop

    try {
      // backend api call
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup successful");
      navigate("/"); // login page
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (

  <div class="container formbox mt-5 rounded-5">
  <div class="row ">

    <div class="col-md-6 p-3">
         <img src="../../public/img.png" class="img-fluid w-100 rounded-5" alt="" />
    </div>

    <div class="col-md-6 p-5 text-light">
           <form onSubmit={handleSignup}>
      <h2 class='text-light'>Signup</h2>
      

      {/* name input */}
       <div class="mb-3">
      <label for="text" class="form-label text-light">Name</label>
      <input class='form-control'
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      </div>

      {/* email input */}
      <div class="mb-3">
      <label for="email" class="form-label text-light">Email</label>
      <input class='form-control'
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /></div>

      {/* password input */}
      <div class="mb-3">
      <label for="password" class="form-label text-light">Password</label>
      <input class='form-control'
        type="password"
        placeholder="Pass*****"
        onChange={(e) => setPassword(e.target.value)}
      /></div>
      <div class='text-center'>
      <button type="submit" class='btn btnconf'>Signup</button>
      </div>
    </form>
    </div>

  </div>
</div>  
  
 
  );
};

export default Signup;
