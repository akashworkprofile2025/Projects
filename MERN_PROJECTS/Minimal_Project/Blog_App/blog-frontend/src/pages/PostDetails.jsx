import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

// Format timestamp from MongoDB
const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mt-5 text-center">
        <h4>{error || "Post not found"}</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow border-0">
        
        {/* Cover Image */}
        {post.coverImage && (
          <img
            src={`http://localhost:5000${post.coverImage}`}
            className="card-img-top"
            alt="Cover"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}

        <div className="card-body">
          {/* Title */}
          <h2 className="fw-bold mb-3">{post.title}</h2>

          {/* Author & Time */}
          <p className="text-muted mb-4">
            <i className="bi bi-person-circle me-1"></i>
            {post.author?.name || "Unknown"} &nbsp;•&nbsp;
            <i className="bi bi-clock me-1"></i>
            {formatDate(post.createdAt)}
          </p>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
