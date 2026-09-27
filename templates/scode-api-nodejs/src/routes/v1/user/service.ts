import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../../../database/db";

export interface User {
  id: number;
  name: string;
  email: string;
  realm: string;
}

export interface Login {
  id: number;
  email: string;
  pswhash: string | undefined;
  realm: string;
}

interface CountRow extends RowDataPacket {
  total: number;
}

interface UserRow extends RowDataPacket, User {}

interface LoginRow extends RowDataPacket, Login {}

export async function countSuper(): Promise<number> {
  const [rows] = await db.query<CountRow[]>(
    "SELECT COUNT(*) AS total FROM user WHERE realm = ?",
    ["super"],
  );

  return rows[0].total;
}

export async function readUsers(): Promise<User[]> {
  const [rows] = await db.query<UserRow[]>(
    "SELECT id, name, email, realm FROM user ORDER BY id",
  );
  return rows ?? null;
}

export async function readUser(id: number): Promise<User | null> {
  const [rows] = await db.query<UserRow[]>(
    "SELECT id, name, email, realm FROM user WHERE id=? LIMIT 1",
    [id],
  );
  return rows[0] ?? null;
}

export async function readUserEmail(email: string): Promise<Login | null> {
  const [rows] = await db.query<LoginRow[]>(
    "SELECT id, email, pswhash, realm FROM user WHERE email=? LIMIT 1",
    [email],
  );
  return rows[0] ?? null;
}

export async function createUser(
  name: string,
  email: string,
  pswhash: string,
  realm: string,
): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO user (name, email, pswhash, realm) VALUES (?, ?, ?, ?)",
    [name, email, pswhash, realm],
  );
  return result.insertId;
}

export async function updateUser(input: User): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE user SET name = ?, email = ?, realm =? WHERE id = ?",
    [input.name, input.email, input.realm, input.id],
  );
  return result.affectedRows > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `DELETE FROM user WHERE id = ?`,
    [id],
  );
  return result.affectedRows > 0;
}
