import { config } from "dotenv";
import express from "express";
import { MongooseClient } from "./database/mongo";

import { routes } from "./routes/routes";

const mongooseClient = new MongooseClient();

config();
const app = express();

mongooseClient.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}.`);
});
