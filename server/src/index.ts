import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { errorHandler } from "./middleware/globalErrorHandler";
import crud from "./routes/crud";
import auth from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(auth);
app.use(crud);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
