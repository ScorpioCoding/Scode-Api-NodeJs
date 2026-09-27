import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import v1 from "./routes/v1";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/v1", v1);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
