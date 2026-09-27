import express, { Router } from "express";
import { health, connection } from "./controller";

const test: Router = express.Router();

test.get("/health", health);
test.get("/connection", connection);

export default test;
