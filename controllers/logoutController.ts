import {User} from "../types/user";

import {Request, Response} from 'express';
import * as fsPromises from 'fs/promises'
import path from "path";
import {AuthRecord} from "../records/auth.record";

export default class logoutController {
    static handleLogout =  async (req: Request, res: Response) => {
        //On client also delete the accessToken
        const cookies: Record<string, string> = req.cookies;

        if(!cookies?.jwt) return res.sendStatus(204); //No content to send back
        const refreshToken = cookies.jwt;

        //Is refreshedToken in db?
        const foundUser: User = await AuthRecord.findUserByToken(refreshToken);
        if(!foundUser) {
            res.clearCookie('jwt', {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000})
            return res.sendStatus(204);
        }

        //Delete refreshToken in db
        await AuthRecord.deleteToken(foundUser.id)

        res.clearCookie('jwt', {httpOnly: true}) //secure: true - only on server with https
        res.sendStatus(204);
    };
}
