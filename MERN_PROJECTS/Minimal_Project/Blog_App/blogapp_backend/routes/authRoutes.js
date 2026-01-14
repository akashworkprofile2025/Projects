import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


const router = express.Router();


router.post("/register", async (req, res) => {
const user = await User.create(req.body);
res.json(user);
});


router.post("/login", async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: "User not found" });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: "Invalid password" });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
expiresIn: "1d",
});


res.json({ token, user });
});


export default router;