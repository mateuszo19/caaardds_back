import {User} from "../types/user";

const usersDB = {
    users: require('../model/users.json') as User[],
    setUsers: function (data: User[]): void {
        this.users = data;
    },
};

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
        const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
        const currentUser = {...foundUser, refreshToken: ''};
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        )

        res.clearCookie('jwt', {httpOnly: true}) //secure: true - only on server with https
        res.sendStatus(204);
    };
}
