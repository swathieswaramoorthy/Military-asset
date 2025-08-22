import express from "express";
import Purchase from "../models/Purchase.js";
import Assignment from "../models/Assignment.js";
import Transfer from "../models/Transfer.js";
import Expenditure from "../models/Expenditure.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Date filter
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = { date: { $gte: new Date(startDate), $lte: new Date(endDate) } };
    }

    // Purchases
    const purchases = await Purchase.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    // Assignments
    const assignments = await Assignment.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    // Transfers
    const transfers = await Transfer.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    // Expenditures
    const expenditures = await Expenditure.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalPurchases: purchases[0]?.total || 0,
      totalAssignments: assignments[0]?.total || 0,
      totalTransfers: transfers[0]?.total || 0,
      totalExpenditures: expenditures[0]?.total || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

export default router;
