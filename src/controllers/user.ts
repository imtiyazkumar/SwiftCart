import { Request, Response } from "express"

export const me = async (req: Request, res: Response) => {
    res.send(req.user)
}
