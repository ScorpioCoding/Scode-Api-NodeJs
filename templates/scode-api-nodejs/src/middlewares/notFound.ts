import { Request, Response } from "express";

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: 0,
    message: "Route Not Found",
  });
};
