import express, { Router } from "express";
import { sendMail } from "./controller";

const email: Router = express.Router();

email.post("/", sendMail);

export default email;
