import express, { Express } from "express";
import cors from "cors";
import { connectDb, disconnectDB, loadEnv } from "./config/index";
import { authRouter, userRouter } from "./routes/index";
import "module-alias/register";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json({ limit: "10mb" }))
  .get("/status", (_req, res) => res.send("OK!"))
  .use("/api/user", userRouter)
  .use("/api/login", authRouter);

export const init = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const close = async (): Promise<void> => {
  await disconnectDB();
};

export default app;
