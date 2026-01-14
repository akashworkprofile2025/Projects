import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
const [form, setForm] = useState({ email: "", password: "" });
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
const res = await API.post("/auth/login", form);
localStorage.setItem("token", res.data.token);
navigate("/");
};


return (
<div className="container col-md-4 mt-5">
<h3 className="text-center">Login</h3>
<form onSubmit={submit}>
<input className="form-control mb-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button className="btn btn-dark w-100">Login</button>
</form>
</div>
);
}