import pino from "pino";
import { env } from "../config/env";

const isDevelopment = env.nodeEnv !== "production";

export const logger = pino({
  level: env.logLevel ?? (isDevelopment ? "debug" : "info"),
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    },
  }),
});
