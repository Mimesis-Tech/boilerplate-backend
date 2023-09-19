import express from "express";
import { config } from "dotenv";
import { router } from "./router";

config();

const app = express();
const port = process.env.port || 8080;

app.use(router);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
