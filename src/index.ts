import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.port || 8080;

app.get("/", (req, res) => {
  res.json({ message: "Boilerplate Backend" });
}); 

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
