import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static("uploads")); // ✅ serve images

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));


app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`);
});