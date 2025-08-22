import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, assignedBase } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password, role, assignedBase });
    await user.save();
    res.json({ name: user.name, email: user.email, role: user.role, assignedBase: user.assignedBase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ name: user.name, email: user.email, role: user.role, assignedBase: user.assignedBase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
