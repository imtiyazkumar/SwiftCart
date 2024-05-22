import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { sign } from "crypto";
import { validateRequest } from "../../errorHandler";
import { SignUpSchema } from "../schema/users";

const authRoutes: Router = Router();

// authRoutes.get("/sign-in", signIn);


authRoutes.post("/sign-up", validateRequest(SignUpSchema), signUp);

// authRoutes.post("/sign-in", errorHandler(signIn));

// errorHandler(signUp)

export default authRoutes;
