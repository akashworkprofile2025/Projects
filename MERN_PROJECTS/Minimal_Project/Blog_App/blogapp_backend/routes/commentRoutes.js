import express from "express";
import Comment from "../models/Comment.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
const comment = await Comment.create({
...req.body,
user: req.user.id,
});
res.json(comment);
});


router.get("/:postId", async (req, res) => {
const comments = await Comment.find({ post: req.params.postId })
.populate("user", "name")
.sort({ createdAt: -1 });
res.json(comments);
});


export default router;