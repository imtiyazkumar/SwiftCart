import { NextFunction, Request, Response } from "express";
import { prismaClient } from './../index';
import { hashSync, compareSync } from 'bcrypt'
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/basRequest";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

// export const signUp = async (req: Request, res: Response, next: NextFunction) => {

//     SignUpSchema.parse(req.body);

//     const { email, password, name } = req.body;

//     let user = await prismaClient.user.findFirst({
//         where: { email }
//     })
//     if (user) {
//         next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS))
//     }

//     user = await prismaClient.user.create({
//         data: {
//             name,
//             email,
//             password: hashSync(password, 10),
//             updated_at: new Date(),
//         }
//     })
//     res.send(user)

// }


export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    SignUpSchema.parse(req.body);

    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({
        where: { email }
    });
    if (user) {
        next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS));
        return;
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
            updated_at: new Date(),
        }
    });
    res.send(user);
};






export const signIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({
        where: { email }
    })
    if (!user) {
        throw Error("user not registered")
    }

    if (!compareSync(password, user.password)) {
        throw Error("Incorrect password")
    }

    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)

    res.send({ user, token })
}