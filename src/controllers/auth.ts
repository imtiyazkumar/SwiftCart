import { NextFunction, Request, Response } from "express";
import { prismaClient } from './../index';
import { hashSync, compareSync } from 'bcrypt'
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/root";
import { SignInSchema, SignUpSchema } from "../schema/users";
import { error } from "console";
import { NotFoundException } from "../exceptions/not-found";

export const signUp = async (req: Request, res: Response) => {
    SignUpSchema.parse(req.body);

    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({
        where: { email }
    });

    if (user) {
        throw new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS, error);
    }

    user = await prismaClient.user.create({ data: { name, email, password: hashSync(password, 10), updated_at: new Date() } });
    res.send(user);
};

export const signIn = async (req: Request, res: Response) => {
    SignInSchema.parse(req.body);

    const { email, password } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
        throw new NotFoundException("user not found", ErrorCode.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestException("Incorrect Password.", ErrorCode.INCORRECT_PASSWORD, null)
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET)
    res.send({ user, token })
}
