import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  quantity: { type: Number, required: true },
  fromBase: { type: String, required: true },
  toBase: { type: String, required: true },
  date: { type: Date, required: true },
});

const Transfer = mongoose.models.Transfer || mongoose.model("Transfer", transferSchema);

export default Transfer;
