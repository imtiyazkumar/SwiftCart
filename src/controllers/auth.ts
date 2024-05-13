import { Request, Response } from "express";

export const signIn = (req: Request, res: Response) => {
    res.send("This is SignIn page")
}
