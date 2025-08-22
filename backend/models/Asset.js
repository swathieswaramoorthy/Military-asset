import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  base: { type: String, required: true },
  type: { type: String, required: true }, // equipmentType
  openingBalance: { type: Number, default: 0 },
  closingBalance: { type: Number, default: 0 },
  purchases: { type: Number, default: 0 },
  transfersIn: { type: Number, default: 0 },
  transfersOut: { type: Number, default: 0 },
  assignedAssets: { type: Number, default: 0 },
  expendedAssets: { type: Number, default: 0 },
});

export default mongoose.model("Asset", AssetSchema);