import mongoose from "mongoose";
import UserType from "../types/user.type";

const userSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0 },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserType>("User", userSchema);
