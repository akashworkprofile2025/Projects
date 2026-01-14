import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
const [form, setForm] = useState({ name: "", email: "", password: "" });
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
await API.post("/auth/register", form);
navigate("/login");
};


return (
<div className="container col-md-4 mt-5">
<h3 className="text-center">Register</h3>
<form onSubmit={submit}>
<input className="form-control mb-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
<input className="form-control mb-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
<input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
<button className="btn btn-success w-100">Register</button>
</form>
</div>
);
}