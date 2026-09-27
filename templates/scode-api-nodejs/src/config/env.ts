import dotenv from "dotenv";
import path from "node:path";

const envFiles = [".env", ".env.mysql"].map((file) =>
  path.resolve(process.cwd(), file),
);

dotenv.config({
  path: envFiles,
  // Earlier files take precedence; set true to let later files override.
  override: false,
});

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  logLevel: process.env.LOG_LEVEL ?? "info",
  key: process.env.APP_KEY,
  db: {
    port: Number(process.env.MYSQL_PORT ?? "3306"),
    host: required("MYSQL_HOST"),
    name: required("MYSQL_DATABASE"),
    user: required("MYSQL_USER"),
    psw: required("MYSQL_PASSWORD"),
  },
  email: {
    user: required("EMAIL_USER"),
    psw: required("EMAIL_PSW"),
  },
} as const;
