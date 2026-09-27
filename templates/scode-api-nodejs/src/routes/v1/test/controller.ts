import { Request, Response } from "express";
import { db } from "../../../database/db";

export const health = (req: Request, res: Response) => {
  res.status(200).json({
    success: 1,
    message: "Api Server is Running.",
  });
};

export const connection = async (req: Request, res: Response) => {
  try {
    await db.query("SELECT 1");
    res.status(200).json({ success: 1, message: "connected" });
  } catch {
    res.status(503).json({ success: 0, message: "disconnected" });
  }
};
