import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api/blogApi";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const getMyPosts = async () => {
      const res = await fetchPosts();
      const userPosts = res.data.filter((post) => post.author === name);
      setMyPosts(userPosts);
    };

    getMyPosts();
  }, [username, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deletePost(id);
    setMyPosts((prev) => prev.filter((post) => post._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {name ? name.charAt(0).toUpperCase() + name.slice(1) : "Your Profile"}
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Manage and explore your blog content</p>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Your Posts
      </h3>

      {myPosts.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          You haven’t written any posts yet.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {myPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 mt-3 text-sm line-clamp-4">
                    {post.content.substring(0, 150)}...
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/edit/${post._id}`}
                    className="text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
