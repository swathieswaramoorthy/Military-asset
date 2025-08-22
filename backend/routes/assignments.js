import express from "express";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// GET assignments
router.get("/", async (req, res) => {
  try {
    const { role, assignedBase, status } = req.query;
    let query = {};

    if (role === "Base Commander" && assignedBase) {
      query.asset = { $regex: assignedBase }; // customize if you store base separately
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const assignments = await Assignment.find(query).sort({ date: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST assignment (create new assignment)
router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment({
      asset: req.body.asset,
      quantity: req.body.quantity,
      assignedTo: req.body.assignedTo,
      status: req.body.status || "Assigned",
      date: req.body.date,
    });

    const saved = await assignment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH assignment (update status)
router.patch("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!assignment) return res.status(404).json({ message: "Not found" });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});
// PUT (update assignment)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (remove assignment)
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
