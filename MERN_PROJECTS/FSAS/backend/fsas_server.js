// express को import कर रहे हैं
import express from "express";
import cors from 'cors'
// dotenv को import कर रहे हैं ताकि .env file use कर सकें
import dotenv from "dotenv";

// database connection file import
import connectDB from "./config/db.js";

// auth routes import
import authRoutes from "./routes/authRoutes.js";

// dotenv config run
dotenv.config();

// express app create
const app = express();
app.use(express.json());

// cors middleware (सबसे important)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url allow
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// database connect
connectDB();

// json data read करने के लिए middleware
app.use(express.json());

// auth routes use
app.use("/api/auth", authRoutes);

// server port
const PORT = process.env.PORT || 5000;

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
