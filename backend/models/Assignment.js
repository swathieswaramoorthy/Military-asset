import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  quantity: { type: Number, required: true },
  assignedTo: { type: String, required: true }, // personnel
  status: { type: String, enum: ["Assigned", "Expended"], default: "Assigned" },
  date: { type: Date, required: true },
});

export default mongoose.model("Assignment", assignmentSchema);
