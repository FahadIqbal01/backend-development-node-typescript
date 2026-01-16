import { Document } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  isActive: boolean;
}

export default UserType;
