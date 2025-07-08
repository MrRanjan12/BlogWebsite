import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/blogController.js"; 

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.post("/posts", authMiddleware, createPost);
router.put("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);

export default router; // ✅ ES module export
