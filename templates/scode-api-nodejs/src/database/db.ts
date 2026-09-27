import mysql from "mysql2/promise";
import { env } from "../config/env";

export const db = mysql.createPool({
  port: env.db.port,
  host: env.db.host,
  database: env.db.name,
  user: env.db.user,
  password: env.db.psw,
  waitForConnections: true,
  connectionLimit: 10,
});
