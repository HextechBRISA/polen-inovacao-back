import express, { Express } from "express";
import cors from "cors";
import { connectDb, disconnectDB, loadEnv } from "./config";
import { userRouter } from "./routes/user-router";

loadEnv();

const app = express();
app
  .use(cors())
  .use(cors())
  .use(express.json({ limit: "10mb" }))
  .get("/status", (_req, res) => res.send("OK!"))
  .use("/api/sign-up", userRouter);

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDB();
};

export default app;
