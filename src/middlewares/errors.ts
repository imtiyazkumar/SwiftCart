import { NextFunction, Request, Response } from "express";
import { HttException } from "../exceptions/root";

export const errorMiddleware = (error: HttException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errCode,
        errors: error.errors
    });
};
