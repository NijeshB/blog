import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  silent: true,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});