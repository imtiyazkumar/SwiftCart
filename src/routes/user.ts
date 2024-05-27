import { Router } from "express";
import { errorHandler } from "../../errorHandler";
import { me } from "../controllers/user";
import authMiddleware from "../middlewares/authMiddleware";

const userRoutes: Router = Router();
userRoutes.get("/me", [authMiddleware], errorHandler(me));

export default userRoutes;
