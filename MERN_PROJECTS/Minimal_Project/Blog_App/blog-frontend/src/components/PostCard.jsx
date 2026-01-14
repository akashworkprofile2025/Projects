import { Link } from "react-router-dom";

// Format timestamp from MongoDB
const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function PostCard({ post }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100 border-0">

        {/* Cover Image */}
        {post.coverImage && (
          <img
            src={`http://localhost:5000${post.coverImage}`}
            className="card-img-top"
            alt="Blog Cover"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          {/* Post Title */}
          <h5 className="card-title fw-bold">{post.title}</h5>

          {/* Author */}
          <p className="text-muted mb-1">
            <i className="bi bi-person-circle me-1"></i>
            {post.author?.name || "Unknown"}
          </p>

          {/* Post Time */}
          <p className="text-muted small mb-3">
            <i className="bi bi-clock me-1"></i>
            {formatDate(post.createdAt)}
          </p>

          {/* Read More Button */}
          <Link
            to={`/post/${post._id}`}
            className="btn btn-primary mt-auto align-self-start"
          >
            Read More <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
