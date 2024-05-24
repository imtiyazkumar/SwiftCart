import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttException } from "./src/exceptions/root"
import { InternalException } from "./src/exceptions/internalException"
import { ZodError } from "zod";
import { BadRequestException } from "./src/exceptions/badRequest";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception: HttException;

            if (error instanceof HttException) {
                exception = error;
            } else {

                if (error instanceof ZodError) {
                    exception = new BadRequestException("Unprocessable entity.", ErrorCode.UNPROCESSABLE_ENTITY, error.errors.map(e => e.message))
                }
                else {
                    exception = new InternalException('Internal Server Error', error, ErrorCode.INTERNAL_EXCEPTION);
                }
            }

            console.error(exception.message, exception.stack);
            next(exception);
        }
    };
};
