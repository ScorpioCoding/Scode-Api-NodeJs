import type { Request, Response, NextFunction } from "express";

export function requireAdminRealm(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.payload) {
    res.status(401).json({ success: 0, message: "Authentication required" });
    return;
  }

  if (req.payload.realm !== "super") {
    if (req.payload.realm !== "admin") {
      res.status(403).json({ success: 0, message: "Admin realm required" });
      return;
    }
  }

  if (req.payload.realm === "admin" || req.payload.realm === "super") next();
}
