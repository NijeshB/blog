import { log } from "console";
import express from "express";
import { PORT } from "./secrets";

const app = express();

app.listen(PORT, () => {
  log(`App is running in port ${PORT}`);
});
