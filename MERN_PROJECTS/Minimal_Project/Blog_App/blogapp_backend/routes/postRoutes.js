import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   MULTER CONFIG (IMAGE UPLOAD)
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const isValid =
      allowed.test(file.mimetype) &&
      allowed.test(path.extname(file.originalname).toLowerCase());

    if (isValid) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
});

/* ===============================
   CREATE POST (WITH COVER IMAGE)
================================ */
router.post(
  "/",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          message: "Title and content are required",
        });
      }

      const post = await Post.create({
        title,
        content,
        coverImage: req.file
          ? `/uploads/${req.file.filename}`
          : null,
        author: req.user.id,
      });

      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to create post",
      });
    }
  }
);

/* ===============================
   GET ALL POSTS (NEWEST FIRST)
================================ */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

/* ===============================
   GET SINGLE POST BY ID
================================ */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

/* ===============================
   UPDATE POST (OPTIONAL IMAGE)
================================ */
router.put(
  "/:id",
  authMiddleware,
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      const updateData = { title, content };

      if (req.file) {
        updateData.coverImage = `/uploads/${req.file.filename}`;
      }

      const post = await Post.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post" });
    }
  }
);

/* ===============================
   DELETE POST
================================ */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

export default router;
