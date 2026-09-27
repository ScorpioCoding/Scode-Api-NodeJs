import mysql from "mysql2/promise";
import path from "node:path";
import process from "node:process";
import { readdir, readFile } from "node:fs/promises";
import { env } from "../config/env";

const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS migrations (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
executed_at TIMESTAMP NOT NULL DEFAULT NOW()
)
`;

async function migrate(): Promise<void> {
  const db = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    database: env.db.name,
    user: env.db.user,
    password: env.db.psw,
    multipleStatements: true,
  });

  try {
    //CREATE MIGRATION TABLE
    await db.query(CREATE_MIGRATIONS_TABLE_SQL);

    //READ MIGRATION FILES
    const files = (await readdir(MIGRATIONS_DIR))
      .filter((name) => /^\d+_.+\.up\.sql$/.test(name))
      .sort();

    for (const name of files) {
      const [rows] = await db.execute(
        "SELECT name FROM migrations WHERE name = ?",
        [name],
      );

      if ((rows as unknown[]).length > 0) continue;

      const sql = await readFile(path.join(MIGRATIONS_DIR, name), "utf8");

      console.log(`Applying ${name}`);
      await db.query(sql);
      await db.execute("INSERT INTO migrations (name) VALUES (?)", [name]);
    }

    console.log("Migrations complete.");
  } finally {
    db.end();
  }
}

migrate().catch((error: unknown) => {
  console.error("Migration failed:", error);
  process.exitCode = 1;
});
