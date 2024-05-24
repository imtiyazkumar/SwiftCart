import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { PORT } from "./secrets";
import rootRouter from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Welcome to SwiftCart! Server is up and working"))

app.use("/api", rootRouter)

app.use(errorMiddleware)

export const prismaClient = new PrismaClient({ log: ["query"] })

app.listen(PORT, () => console.log("Server running at http://localhost:8090/"));
