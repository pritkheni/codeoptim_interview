import mongoose from "mongoose";
const connection = process.env.MONGO_URL as string;

//@description: for connecting to db
export const connectDb = async () => {
  try {
    await mongoose.connect(connection);
    console.log(`[database]: connection successfully`);
  } catch (err) {
    console.log(`[database]: ${err}`);
  }
};
