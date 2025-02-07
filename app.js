import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", course);
app.use("/api/v1", user);

app.use(ErrorMiddleware);

export default app;
