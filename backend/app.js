// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// // Routes

// const authRoutes = require("./routes/auth");
// const purchaseRoutes = require("./routes/purchases");
// const transferRoutes = require("./routes/transfers");
// const assignmentRoutes = require("./routes/assignments");
// const dashboardRoutes = require("./routes/dashboard");

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express(); // <-- app must be declared BEFORE using app.use()

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/purchases", purchaseRoutes);
// app.use("/api/transfers", transferRoutes);
// app.use("/api/assignments", assignmentRoutes);
// app.use("/api/dashboard", dashboardRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.send("Military Asset Management System Backend is running...");
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Server Error", error: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import transferRoutes from "./routes/transfers.js";
import assignmentsRoutes from "./routes/assignments.js";
import expenditureRoutes from "./routes/expenditure.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/expenditures", expenditureRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
