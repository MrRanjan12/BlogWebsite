import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition duration-200 border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>

        <p className="text-gray-600 text-sm mb-4">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
        <span>By {post.author || "Anonymous"}</span>
        <span>{formattedDate}</span>
      </div>

      <div className="mt-4">
        <Link
          to={`/post/${post._id}`}
          className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
