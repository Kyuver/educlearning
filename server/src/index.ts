import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import prisma from "./db";
import apiRoutes from "./routes/api";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().optional().default(5000),
});

const env = envSchema.parse(process.env);

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(apiRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running!");
});

app.get("/test-db", async (_req: Request, res: Response) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
