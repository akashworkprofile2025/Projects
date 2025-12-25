// react import
import { useNavigate } from "react-router-dom";
import '../styles/dash.css'
const Dashboard = () => {
  // navigation hook
  const navigate = useNavigate();

  // localStorage से user name निकाल रहे हैं
  const userName = localStorage.getItem("name");

  // logout function
  const logout = () => {
    // token remove
    localStorage.removeItem("token");

    // name remove
    localStorage.removeItem("name");

    // login page redirect
    navigate("/");
  };

  return (
    <div class=' container text-center mt-5 pt-5 pb-5 dashbox w-50 text-light'>
      {/* welcome message with user name */}
      <h1 class='text-light'>Welcome {userName}</h1>
       <br />
      {/* logout button */}
      <button class='btn btnconf shadow' onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
