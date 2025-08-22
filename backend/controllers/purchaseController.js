import asyncHandler from "express-async-handler";
import Purchase from "../models/Purchase.js";

// Get all purchases
export const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find().sort({ date: -1 });
  res.json(purchases);
});

// Add new purchase
export const addPurchase = asyncHandler(async (req, res) => {
  const { name, type, base, quantity, date } = req.body;

  const newPurchase = await Purchase.create({ name, type, base, quantity, date });
  res.status(201).json(newPurchase);
});

// Update purchase
export const updatePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Purchase not found");
  }

  purchase.name = req.body.name;
  purchase.type = req.body.type;
  purchase.base = req.body.base;
  purchase.quantity = req.body.quantity;
  purchase.date = req.body.date;

  const updatedPurchase = await purchase.save();
  res.json(updatedPurchase);
});

// Delete purchase
export const deletePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findByIdAndDelete(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Purchase not found");
  }
  res.json({ message: "Purchase deleted successfully" });
});
