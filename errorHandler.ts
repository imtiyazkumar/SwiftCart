import { NextFunction, RequestHandler, Request, Response } from "express"
import { ErrorCode, HttException } from "./src/exceptions/root"
import { InternalException } from "./src/exceptions/internalException"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception: HttException;

            if (error instanceof HttException) {
                exception = error;
            } else {
                exception = new InternalException(
                    'Internal Server Error',
                    error,
                    ErrorCode.INTERNAL_EXCEPTION
                );
            }

            console.error(exception.message, exception.stack);
            next(exception);
        }
    };
};




// export const errorHandler = (method: RequestHandler): RequestHandler => {
//     return async (req, res, next): Promise<void> => {
//         try {
//             method(req, res, next);
//         } catch (error) {
//             let exception: HttException;

//             if (error instanceof HttException) {
//                 exception = error;
//             } else {
//                 exception = new InternalException(
//                     'Internal Server Error',
//                     error,
//                     ErrorCode.INTERNAL_EXCEPTION
//                 );
//             }

//             console.error(exception.message, exception.stack);

//             next(exception);
//         }
//     };
// };

// const test: RequestHandler = () => {
//     console.log("test")
// }

// return test;
