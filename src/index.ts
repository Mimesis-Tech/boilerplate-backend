import express from "express";
import { config } from "dotenv";
import { router } from "./router";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();

  await MongoClient.connect();

  app.use(router);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });
};

main();
