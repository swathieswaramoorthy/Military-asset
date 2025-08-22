import asyncHandler from "express-async-handler";
import Transfer from "../models/Transfer.js";

// Get all transfers
export const getTransfers = asyncHandler(async (req, res) => {
  const { role, assignedBase } = req.query;
  let query = {};
  if (role === "Base Commander" && assignedBase) {
    query.$or = [{ fromBase: assignedBase }, { toBase: assignedBase }];
  }
  const transfers = await Transfer.find(query).sort({ date: -1 });
  res.json(transfers);
});

// Add a transfer
export const addTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.create(req.body);
  res.status(201).json(transfer);
});

// Update transfer
export const updateTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id);
  if (!transfer) {
    res.status(404);
    throw new Error("Transfer not found");
  }

  transfer.asset = req.body.asset;
  transfer.quantity = req.body.quantity;
  transfer.fromBase = req.body.fromBase;
  transfer.toBase = req.body.toBase;
  transfer.date = req.body.date;

  const updated = await transfer.save();
  res.json(updated);
});

// Delete transfer
export const deleteTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findByIdAndDelete(req.params.id);
  if (!transfer) {
    res.status(404);
    throw new Error("Transfer not found");
  }
  res.json({ message: "Transfer deleted successfully" });
});
