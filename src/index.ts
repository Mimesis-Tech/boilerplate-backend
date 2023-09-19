import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.port || 8080;

app.get("/", (req, res) => {
  res.send("Oee");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
