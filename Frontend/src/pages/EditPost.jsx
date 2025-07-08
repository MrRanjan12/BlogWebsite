import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/blogApi";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchPost(id).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, form);
    navigate(`/post/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Post title"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={form.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Edit your post content..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition duration-200 w-full"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
