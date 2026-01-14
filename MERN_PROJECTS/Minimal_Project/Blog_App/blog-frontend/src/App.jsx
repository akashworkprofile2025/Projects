import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route
path="/create"
element={
<ProtectedRoute>
<CreatePost />
</ProtectedRoute>
}
/>
<Route path="/post/:id" element={<PostDetails />} />
</Routes>
</BrowserRouter>
);
}