import type { Request, Response, NextFunction } from "express";
import * as emailService from "./service";
import { env } from "../../../config/env";

export async function sendMail(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { to, subject, text } = req.body as {
    to?: string;
    subject?: string;
    text?: string;
  };

  if (!to || !subject || !text) {
    res.status(400).json({
      success: 0,
      message: "to, subject and text are required",
    });
    return;
  }

  try {
    const email = await emailService.transporter.sendMail({
      from: env.email.user,
      to,
      subject,
      text,
    });
    if (!email) {
      res.status(500).json({
        success: 0,
        message: "Failed to send email",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: "Email sent successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
}
