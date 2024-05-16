import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { sign } from "crypto";

const authRoutes: Router = Router();

// authRoutes.get("/sign-in", signIn);


authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", signIn);



export default authRoutes;
