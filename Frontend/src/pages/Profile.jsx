import React, { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api/blogApi";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const getMyPosts = async () => {
      const res = await fetchPosts();
      const userPosts = res.data.filter((post) => post.author === username);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {username}'s Profile
      </h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-6">Your Posts</h3>

      {myPosts.length === 0 ? (
        <p className="text-gray-500">You haven’t written any posts yet.</p>
      ) : (
        <div className="space-y-6">
          {myPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h4>
              <p className="text-gray-600 mb-4">
                {post.content.substring(0, 100)}...
              </p>
              <div className="flex gap-4 text-sm">
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read
                </Link>
                <Link
                  to={`/edit/${post._id}`}
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
