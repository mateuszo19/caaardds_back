import {User} from "../types/user";

import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {AuthRecord} from "../records/auth.record";

dotenv.config();

export default class refreshTokenController {
    static handleRefreshToken =  async (req: Request, res: Response) => {
        const cookies: Record<string, string> = req.cookies;
        if(!cookies?.jwt) return res.sendStatus(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;
        // const foundUser: FoundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
        const foundUser: User = await AuthRecord.findUserByToken(refreshToken);
        if(!foundUser) return res.sendStatus(403); //Forbidden
        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET : "123",
            (err, decoded: any) => {
                //@ts-ignore
                if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                // const roles: number[] = Object.values(foundUser.roles)
                //@ts-ignore
                const values = Object.keys(foundUser.roles).map(key => foundUser.roles[key]);
                const roles = values.join(",");
                const accessToken = jwt.sign(
                    { "UserInfo": {
                            "username": decoded.username,
                            "roles": roles
                        }},
                    process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : "123",
                    { expiresIn: '30s' }
                );
                res.json({ accessToken })
            }
        )
    };
}
