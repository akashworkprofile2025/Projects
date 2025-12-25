// express import
import express from "express";

// bcrypt import (password hashing)
import bcrypt from "bcryptjs";

// jwt import
import jwt from "jsonwebtoken";

// user model import
import User from "../models/User.js";

const router = express.Router();

/* =========================
   USER SIGNUP
========================= */
router.post("/signup", async (req, res) => {
  try {
    // request body से data निकाल रहे हैं
    const { name, email, password, role } = req.body;

    // check user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // password hash कर रहे हैं
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user create
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // response भेज रहे हैं
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   USER LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    // email & password निकाल रहे हैं
    const { email, password } = req.body;

    // user check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // password match check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // jwt token generate
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token expiry
    );

    // token send
    res.json({
      message: "Login successful",
      token,
      name:user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
