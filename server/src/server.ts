import express from "express";
import cors from "cors";
import { routes } from "./routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`HTTP server running on PORT ${process.env.PORT}`);
});
