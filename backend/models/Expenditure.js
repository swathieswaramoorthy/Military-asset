import mongoose from "mongoose";

const expenditureSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Expenditure", expenditureSchema);
