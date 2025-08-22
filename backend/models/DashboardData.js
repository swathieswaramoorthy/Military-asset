// models/DashboardData.js
import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  base: { type: String, required: true },
  equipmentType: { type: String, required: true },
  openingBalance: { type: Number, default: 0 },
  closingBalance: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  transferIn: { type: Number, default: 0 },
  transferOut: { type: Number, default: 0 },
  assignedAssets: { type: Number, default: 0 },
  expendedAssets: { type: Number, default: 0 },
});

export default mongoose.model("DashboardData", DashboardSchema);
