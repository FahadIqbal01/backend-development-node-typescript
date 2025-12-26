import { Document } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
}

export default UserType;
