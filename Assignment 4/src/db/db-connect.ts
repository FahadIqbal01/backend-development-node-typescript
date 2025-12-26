import mongoose from "mongoose";

async function ConnectDatabase() {
  await mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => {
      console.log("Database connection successful.");
    })
    .catch((reason) => {
      console.log(`Database connection failed with ${reason}.`);
    });
}

export default ConnectDatabase;
