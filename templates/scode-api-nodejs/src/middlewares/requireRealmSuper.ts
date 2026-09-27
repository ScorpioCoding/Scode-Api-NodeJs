import type { Request, Response, NextFunction } from "express";

export function requireSuperRealm(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.payload) {
    res.status(401).json({ success: 0, message: "Authentication required" });
    return;
  }

  if (req.payload.realm !== "super") {
    res.status(403).json({ success: 0, message: "Super realm required" });
    return;
  }

  next();
}
