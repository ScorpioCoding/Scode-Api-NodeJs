import express, { Router } from "express";
import test from "./test";
import user from "./user";
import email from "./email";

const v1: Router = express.Router();

v1.use("/test", test);
v1.use("/user", user);
v1.use("/email", email);

export default v1;
