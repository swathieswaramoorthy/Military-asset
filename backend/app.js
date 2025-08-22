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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/expenditures", expenditureRoutes);

app.get("/", (req, res) => {
  res.send("Military Asset Management System Backend is running...");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

const MONGO_URI = process.env.MONGO_URI;
console.log("Connecting to MongoDB Atlas:", MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas Connected Successfully!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
