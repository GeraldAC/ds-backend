import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(cors({ origin: env.front }));
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
