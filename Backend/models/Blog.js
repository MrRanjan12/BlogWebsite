import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    default: "Anonymous",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
