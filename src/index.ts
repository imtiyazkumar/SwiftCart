import express, { Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";
import { validateRequest } from "../errorHandler";

const app = express();


app.use(express.json());

app.use("/api", rootRouter)

app.use(errorMiddleware)

app.use(validateRequest)


export const prismaClient = new PrismaClient({
    log: ["query"]
})

app.listen(PORT, () => console.log("Running on http://localhost:8090/"));
