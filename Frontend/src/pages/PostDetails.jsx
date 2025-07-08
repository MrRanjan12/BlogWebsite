import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, deletePost } from "../api/blogApi";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then((res) => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      await deletePost(id);
      navigate("/");
    }
  };

  if (!post) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Author: <span className="font-medium">{post.author || "Anonymous"}</span>
        </p>

        <div className="flex gap-4">
          <Link
            to={`/edit/${post._id}`}
            className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
