import mongoose from "mongoose";
import UserType from "../types/user.type";

const user = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    age: { type: Number, min: 18 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<UserType>("Users", user);
