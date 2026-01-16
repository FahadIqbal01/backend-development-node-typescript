import mongoose from "mongoose";

const dbConnection: string = process.env.DATABASE_CONNECTION as string;

export function ConnectDB() {
  try {
    mongoose
      .connect(dbConnection)
      .then(() => {
        console.log("Database connected successfully.");
      })
      .catch((reason) => {
        console.log(`Database connection failed with ${reason}`);
      });
  } catch (error) {
    console.log(`Database connection failed with ${error}`);
  }
}
