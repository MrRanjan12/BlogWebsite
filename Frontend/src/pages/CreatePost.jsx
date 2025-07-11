import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/blogApi";

const CreatePost = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Login to create a post");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author = localStorage.getItem("name");
    await createPost({ ...form, author });
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows="6"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your post content here..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition duration-200 w-full"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
