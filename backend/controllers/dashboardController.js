import asyncHandler from "express-async-handler";
import Purchase from "../models/Purchase.js";
import Transfer from "../models/Transfer.js";
import Assignment from "../models/Assignment.js";
import Expenditure from "../models/Expenditure.js";

// Get dashboard metrics - POST endpoint
export const getDashboardMetrics = asyncHandler(async (req, res) => {
  try {
    const { startDate, endDate, base, equipmentType } = req.body;
    
    console.log("📊 Dashboard metrics request:", { startDate, endDate, base, equipmentType });

    // Build query objects
    const purchaseQuery = {};
    const transferQuery = {};
    const assignmentQuery = {};
    const expenditureQuery = {};

    // Date filtering
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      purchaseQuery.date = { $gte: start, $lte: end };
      transferQuery.date = { $gte: start, $lte: end };
      assignmentQuery.date = { $gte: start, $lte: end };
      expenditureQuery.date = { $gte: start, $lte: end };
    }

    // Base filtering
    if (base && base !== "All") {
      purchaseQuery.base = base;
      transferQuery.$or = [{ fromBase: base }, { toBase: base }];
      assignmentQuery.assignedBase = base;
    }

    // Equipment type filtering
    if (equipmentType && equipmentType !== "All") {
      purchaseQuery.type = equipmentType;
      transferQuery.asset = { $regex: equipmentType, $options: 'i' };
      assignmentQuery.asset = { $regex: equipmentType, $options: 'i' };
      expenditureQuery.category = equipmentType;
    }

    console.log("🔍 Database queries:", {
      purchase: purchaseQuery,
      transfer: transferQuery,
      assignment: assignmentQuery,
      expenditure: expenditureQuery
    });

    // Fetch all data in parallel
    const [purchases, transfers, assignments, expenditures] = await Promise.all([
      Purchase.find(purchaseQuery).lean(),
      Transfer.find(transferQuery).lean(),
      Assignment.find(assignmentQuery).lean(),
      Expenditure.find(expenditureQuery).lean()
    ]);

    console.log("📦 Data retrieved:", {
      purchases: purchases.length,
      transfers: transfers.length,
      assignments: assignments.length,
      expenditures: expenditures.length
    });

    // Calculate opening balance (all purchases before start date)
    let openingBalance = 0;
    if (startDate) {
      const openingQuery = { date: { $lt: new Date(startDate) } };
      if (base && base !== "All") openingQuery.base = base;
      if (equipmentType && equipmentType !== "All") openingQuery.type = equipmentType;
      
      const openingPurchases = await Purchase.find(openingQuery).lean();
      openingBalance = openingPurchases.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
      
      console.log("Opening balance:", { openingPurchases: openingPurchases.length, openingBalance });
    }

    // Calculate metrics
    const totalPurchases = purchases.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0);
    
    const transfersIn = transfers
      .filter(t => !base || base === "All" || t.toBase === base)
      .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
    
    const transfersOut = transfers
      .filter(t => !base || base === "All" || t.fromBase === base)
      .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
    
    const assigned = assignments.reduce((sum, a) => sum + (Number(a.quantity) || 0), 0);
    
    const expended = expenditures.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    // Calculate final metrics
    const netMovement = totalPurchases + transfersIn - transfersOut;
    const closingBalance = Math.max(0, openingBalance + netMovement - assigned);

    const response = {
      openingBalance,
      closingBalance,
      netMovement,
      assigned,
      expended,
      purchases: totalPurchases,
      transfersIn,
      transfersOut
    };

    console.log("✅ Final metrics:", response);
    res.json(response);

  } catch (err) {
    console.error("❌ Dashboard metrics error:", err);
    res.status(500).json({ 
      error: "Failed to fetch dashboard metrics",
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Get available filter options
export const getFilterOptions = asyncHandler(async (req, res) => {
  try {
    const [purchaseBases, transferFromBases, transferToBases, equipmentTypes] = await Promise.all([
      Purchase.distinct("base"),
      Transfer.distinct("fromBase"),
      Transfer.distinct("toBase"),
      Purchase.distinct("type")
    ]);

    // Combine all unique bases
    const allBases = [...new Set([...purchaseBases, ...transferFromBases, ...transferToBases])].filter(b => b);
    
    res.json({
      bases: ["All", ...allBases],
      equipmentTypes: ["All", ...equipmentTypes.filter(t => t)]
    });
  } catch (err) {
    console.error("❌ Filters error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
export const healthCheck = asyncHandler(async (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    message: "Dashboard API is running",
    version: "1.0.0"
  });
});