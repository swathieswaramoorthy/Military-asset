import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  base: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

// Prevent overwrite errors
const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
