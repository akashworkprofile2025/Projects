import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
const navigate = useNavigate();
const token = localStorage.getItem("token");


const logout = () => {
localStorage.clear();
navigate("/login");
};


return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container">
<Link className="navbar-brand" to="/">
<i className="bi bi-journal-richtext me-2"></i>Blogify
</Link>
<div>
{token ? (
<>
<Link className="btn btn-outline-light me-2" to="/create">
<i className="bi bi-plus-circle"></i> New Post
</Link>
<button className="btn btn-danger" onClick={logout}>
Logout
</button>
</>
) : (
<>
<Link className="btn btn-outline-light me-2" to="/login">
Login
</Link>
<Link className="btn btn-success" to="/register">
Register
</Link>
</>
)}
</div>
</div>
</nav>
);
}