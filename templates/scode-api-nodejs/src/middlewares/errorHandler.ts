import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error({ err }, "Unhandled Error");

  res.status(500).json({
    succes: 0,
    message: "Internal Server Error",
  });
};
