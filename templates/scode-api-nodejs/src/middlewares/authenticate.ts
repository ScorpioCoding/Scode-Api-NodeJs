import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET: string | undefined = env.key;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

interface AuthTokenPayload extends JwtPayload {
  id: number;
  realm: string;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ success: 0, message: "Bearer token required" });
    return;
  }

  try {
    const payload = jwt.verify(token, String(JWT_SECRET)) as AuthTokenPayload;

    if (
      !Number.isSafeInteger(payload.id) ||
      typeof payload.realm !== "string"
    ) {
      res.status(401).json({ success: 0, message: "Invalid token payload" });
      return;
    }

    req.payload = { id: payload.id, realm: payload.realm };
    next();
  } catch {
    res.status(401).json({ success: 0, message: "Invalid or expired token" });
  }
}
