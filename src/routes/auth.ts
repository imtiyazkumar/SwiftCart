import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { errorHandler } from "../../errorHandler";

const authRoutes: Router = Router();
authRoutes.post("/sign-up", errorHandler(signUp));

authRoutes.post("/sign-in", errorHandler(signIn));

export default authRoutes;
