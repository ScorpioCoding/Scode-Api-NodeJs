import express, { Router } from "express";
import { authenticate } from "../../../middlewares/authenticate";
import { requireSuperRealm } from "../../../middlewares/requireRealmSuper";
import { requireAdminRealm } from "../../../middlewares/requireRealmAdmin";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  login,
  postMaster,
} from "./controller";

const user: Router = express.Router();

user.get("/", getUsers);
user.get("/:id", authenticate, requireAdminRealm, getUser);
user.post("/", authenticate, requireAdminRealm, postUser);
user.put("/", authenticate, requireAdminRealm, putUser);
user.delete("/", authenticate, requireSuperRealm, deleteUser);
user.post("/login", login);

user.post("/master", postMaster);

export default user;
