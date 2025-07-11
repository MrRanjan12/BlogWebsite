import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api/blogApi";


const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then((res) => setPost(res.data));
  }, [id]);


  if (!post) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{post.content}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Author: <span className="font-medium">{post.author || "Anonymous"}</span>
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
