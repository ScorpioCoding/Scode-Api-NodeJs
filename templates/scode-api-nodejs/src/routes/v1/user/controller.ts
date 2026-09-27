import type { Request, Response, NextFunction } from "express";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "../../../config/env";
import * as userService from "./service";

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await userService.readUsers();
    if (!users) {
      res.status(404).json({ success: 0, message: "Users not found" });
      return;
    }
    res.json({ success: 1, data: users });
  } catch (error) {
    next(error);
  }
}

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ success: 0, message: "Invalid user ID" });
    return;
  }

  try {
    const user = await userService.readUser(id);

    if (!user) {
      res.status(404).json({ success: 0, message: "User not found" });
      return;
    }
    res.json({ success: 1, data: user });
  } catch (error) {
    next(error);
  }
}

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, name, password, realm } = req.body as {
      email?: string;
      name?: string;
      password?: string;
      realm?: string;
    };

    if (!email || !name || !password || !realm) {
      res.status(400).json({
        success: 0,
        message: "email, name, password and realm are required",
      });
      return;
    }

    const salt = genSaltSync(10);
    const pswhash = hashSync(password, salt);

    const id = await userService.createUser(name, email, pswhash, realm);
    res.status(201).json({ id, name, email, realm });
  } catch (error) {
    next(error);
  }
}

export async function putUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { name, email, realm, id } = req.body;

  if (typeof name !== "string" || typeof email !== "string") {
    res
      .status(400)
      .json({ success: 0, message: "name and email are required strings" });
    return;
  }

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ success: 0, message: "Invalid user ID" });
    return;
  }

  try {
    const updated = await userService.updateUser({ id, name, email, realm });

    if (!updated) {
      res.status(404).json({ success: 0, message: "User not found" });
      return;
    }

    res.json({ id, name, email, realm });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.body;

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ success: 0, message: "Invalid user ID" });
    return;
  }

  try {
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      res.status(404).json({ success: 0, message: "User not found" });
      return;
    }

    res.status(204).json({ success: 1, message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({
      success: 0,
      message: "email and password are required",
    });
    return;
  }

  try {
    const user = await userService.readUserEmail(email);

    if (!user) {
      res.status(404).json({ success: 0, message: "User not found" });
      return;
    }

    const compare = compareSync(password, String(user.pswhash));
    if (!compare) {
      res
        .status(404)
        .json({ success: 0, message: "Invalid email or password" });
      return;
    }

    user.pswhash = undefined;
    const jsontoken = sign(
      { id: Number(user.id), realm: String(user.realm) },
      String(env.key),
      { expiresIn: "1h" },
    );

    res
      .status(200)
      .json({ success: 1, message: "Login successfully", token: jsontoken });
  } catch (error) {
    next(error);
  }
}

export async function postMaster(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, name, password, realm } = req.body as {
    email?: string;
    name?: string;
    password?: string;
    realm?: string;
  };

  if (!email || !name || !password || !realm) {
    res.status(400).json({
      success: 0,
      message: "email, name, password and realm are required",
    });
    return;
  }

  try {
    const count = await userService.countSuper();
    if (count > 0) {
      res.status(400).json({
        success: 0,
        message: "Master User exists",
      });
      return;
    }
    const salt = genSaltSync(10);
    const pswhash = hashSync(password, salt);

    const id = await userService.createUser(name, email, pswhash, realm);
    res.status(201).json({ id, name, email, realm });
  } catch (error) {
    next(error);
  }
}
