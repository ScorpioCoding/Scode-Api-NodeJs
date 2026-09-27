import nodemailer from "nodemailer";
import { env } from "../../../config/env";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.email.user,
    pass: env.email.psw,
  },
});
