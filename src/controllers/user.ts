import { Request, Response } from "express"

export const me = async (req: Request, res: Response) => {
    res.send("this is me route")
}
