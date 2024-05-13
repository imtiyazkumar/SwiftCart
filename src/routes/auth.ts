import { Router } from "express";
import { signIn } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.get("/sign-in", signIn);


export default authRoutes;
