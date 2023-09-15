import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {Request,Response,NextFunction} from "express";

dotenv.config();

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization + "";
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) //unauthorized
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : "123",
        (err, decoded: any) => {
            console.log(err)
            if(err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username
            //@ts-ignore
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}