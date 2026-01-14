import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";


export default function Home() {
const [posts, setPosts] = useState([]);


useEffect(() => {
API.get("/posts").then((res) => setPosts(res.data));
}, []);


return (
<div className="container mt-4">
<div className="row">
{posts.map((post) => (
<PostCard key={post._id} post={post} />
))}
</div>
</div>
);
}