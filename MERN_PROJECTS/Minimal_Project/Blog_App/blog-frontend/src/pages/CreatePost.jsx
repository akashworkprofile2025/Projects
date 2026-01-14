import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      // ❗ IMPORTANT: Do NOT set Content-Type manually
      await API.post("/posts", formData);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-6 mt-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <h3 className="mb-4 text-center">
            <i className="bi bi-pencil-square me-2"></i>
            Create Blog Post
          </h3>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={submitHandler} encType="multipart/form-data">
            {/* Title */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Content */}
            <textarea
              className="form-control mb-3"
              rows="6"
              placeholder="Write your blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            {/* Cover Image */}
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={(e) =>
                setCoverImage(e.target.files[0])
              }
            />

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
