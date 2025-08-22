import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain for simplicity (use bcrypt in production)
  role: { type: String, enum: ["Admin", "Base Commander", "Logistics Officer"], required: true },
  assignedBase: { type: String }, // only for Base Commander
});

export default mongoose.model("User", userSchema);
