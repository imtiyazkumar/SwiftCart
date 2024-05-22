import { NextFunction, RequestHandler, Request, Response } from "express"
import { ErrorCode, HttException } from "./src/exceptions/root"
import { InternalException } from "./src/exceptions/internalException"
import { BadRequestException } from "./src/exceptions/basRequest";
import { ZodError, ZodSchema } from "zod";
import { UnprocessableEntity } from "./src/exceptions/validation";

// export const errorHandler = (method: Function) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await method(req, res, next);
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


export const validateRequest = (schema: ZodSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            let exception: HttException;



            if (error instanceof ZodError) {
                // If it's a Zod validation error, construct a BadRequestException
                exception = new UnprocessableEntity(error.errors.map(e => e.message), "Validation Failed", ErrorCode.UNPROCESSABLE_ENTITY);
            }


            else if (error instanceof HttException) {
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
        };
    };

}


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







// export const errorHandler = (method: Function, schema?: any) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             // If schema is provided, parse the request body
//             if (schema) {
//                 schema.parse(req.body);
//             }
//             await method(req, res, next);
//         } catch (error: any) {
//             let exception: HttException;

//             if (error instanceof HttException) {
//                 // If it's a custom HTTP exception, just pass it to the next middleware
//                 exception = error;
//                 return;
//             }

//             if (error instanceof ZodError) {
//                 // If it's a Zod validation error, construct a BadRequestException
//                 exception = new UnprocessableEntity(error.message, "Validation failed", ErrorCode.UNPROCESSABLE_ENTITY);

//                 // exception = error;
//             } else {
//                 // For other errors, create an InternalException
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
