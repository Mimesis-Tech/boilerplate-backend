import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

config();

const uri = process.env.MONGODB_URL as string;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

import { IMongooseClient } from "../types/mongooseClient";

export class MongooseClient implements IMongooseClient {
  async connect(): Promise<void> {
    await mongoose.connect(uri, options).then(
      () => {
        console.log("Database connection established!");
      },
      (err) => {
        console.log("Error connecting Database instance due to:", err);
      }
    );
  }
}
