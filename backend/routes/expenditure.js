import express from "express";
import Expenditure from "../models/Expenditure.js";

const router = express.Router();

// GET all expenditures
router.get("/", async (req, res) => {
  try {
    const data = await Expenditure.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new expenditure
router.post("/", async (req, res) => {
  try {
    const newExp = new Expenditure(req.body);
    const saved = await newExp.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update expenditure
router.put("/:id", async (req, res) => {
  try {
    const exp = await Expenditure.findById(req.params.id);
    if (!exp) return res.status(404).json({ error: "Expenditure not found" });

    exp.category = req.body.category;
    exp.amount = req.body.amount;
    exp.description = req.body.description;

    const updated = await exp.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE expenditure
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expenditure.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Expenditure not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
