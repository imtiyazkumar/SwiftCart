import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttException } from "./src/exceptions/root";
import { InternalException } from "./src/exceptions/internalException";
import { hashSync } from "bcrypt";
import { prismaClient } from "./src";
import { BadRequestException } from "./src/exceptions/basRequest";
import { SignUpSchema } from "./src/schema/users";


export const errorHandler = (method: Function) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            method(req, res, next)
        } catch (error) {
            let exception: HttException;

            if (error instanceof HttException) {
                exception = error;
            }
            else {
                exception = new InternalException('something went wrong', error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception);
        }
    }
}


export const signUp = async (req: Request, res: Response, next: NextFunction) => {

    SignUpSchema.parse(req.body);

    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({
        where: { email }
    })
    if (user) {
        next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS))
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
            updated_at: new Date(),
        }
    })
    res.send(user)

}

const test = () => {
    console.log("test")

    console.log(typeof (errorHandler(signUp)))
}
test()
