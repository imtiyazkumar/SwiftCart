import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { sign } from "crypto";
import { errorHandler } from "../../errorHandler";

const authRoutes: Router = Router();

// authRoutes.get("/sign-in", signIn);


authRoutes.post("/sign-up", errorHandler(signUp));

// authRoutes.post("/sign-in", errorHandler(signIn));

// errorHandler(signUp)

export default authRoutes;
