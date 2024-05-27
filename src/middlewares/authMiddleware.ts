// import { NextFunction, Request, Response } from "express";
// import * as jwt from "jsonwebtoken";
// import { UnAuthorizedException } from "../exceptions/unAuthorizedException";
// import { ErrorCode } from "../exceptions/root";
// import { JWT_SECRET } from "../secrets";
// import { prismaClient } from "..";

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

//     const token = req.headers.authorization;

//     if (!token) {
//         next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
//     }

//     try {
//         const payload: any = token && jwt.verify(token, JWT_SECRET);

//         const user = prismaClient.user.findFirst({ where: { id: payload?.userId } })

//         if (!user) {
//             next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));

//         }

//         req.user = user;
//     } catch (error) {
//         next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));

//     }

// }

// export default authMiddleware;


import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnAuthorizedException } from "../exceptions/unAuthorizedException";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }

    try {
        const payload: any = jwt.verify(token, JWT_SECRET);

        const user = await prismaClient.user.findFirst({ where: { id: payload?.userId } });

        if (!user) {
            return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new UnAuthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }
}

export default authMiddleware;
