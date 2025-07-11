import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/blogApi";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-10">
      {/* Hero Header */}
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Explore Inspiring Blogs ✍️
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
          Fresh stories, tips, and ideas from creators around the world.
        </p>
      </header>

      {/* Blog Posts Section */}
      <main className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          All Blog Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-10">
            No blog posts found. Stay tuned!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
