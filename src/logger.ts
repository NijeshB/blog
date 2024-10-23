import winston from "winston";
import { secrets } from "./secrets";

const silentLog: Boolean = secrets.ENABLE_LOG
  ? secrets.ENABLE_LOG === "true"
  : true;
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  silent: !silentLog,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
