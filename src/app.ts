import express from "express";
import { secrets } from "./secrets";
import cors from "cors";
import compression from "compression";
import userRouter from "./routes/user";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./requestHandler";
import { logger } from "./logger";

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use("/users", userRouter);

export const prismaClient = new PrismaClient({ log: ["query"] });
app.listen(secrets.PORT, () => {
  logger.info(`App is running in port ${secrets.PORT}`);
});

app.use(errorHandler);
