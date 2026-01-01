import mongoose from "mongoose";

async function ConnectDatabase() {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => {
        console.log("Successfully connected to database.");
      })
      .catch((reason) => console.log(`Failed to connect. Error: ${reason}`));
  } catch (error) {
    console.log(`Connection Error: ${error}`);
  }
}

export default ConnectDatabase;
