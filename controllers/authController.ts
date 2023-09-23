import bcrypt = require('bcrypt');
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {UserRecord} from "../records/user.record";
import {AuthRecord} from "../records/auth.record";
import {User} from "../types/user";

dotenv.config();

export default class authController {
    static handleLogin = async (req: Request, res: Response) => {
        const {user, pwd} = req.body;
        if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required'});
        // const foundUser = usersDB.users.find(person => person.username === user)
        const foundUser: User = (await UserRecord.findUserByName(user)).rows[0];
        if(!foundUser) return res.sendStatus(401); //Unauthorized
        //evaluate password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if(match){
            // const roles = Object.values(foundUser.roles)
            // const values = Object.keys(foundUser.roles).map(key => foundUser.roles[key]);
            // const roles = values.join("");
            const roles = Object.values(foundUser.roles);

            //create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : "123",
                {
                    expiresIn: '1h'
                }
            )
            const refreshToken = jwt.sign(
                {'username': foundUser.username},
                process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET : "123",
                {
                    expiresIn: '5m'
                }
            )
            // Saving refresh token with current user
            await AuthRecord.updateToken(foundUser.id, refreshToken)

            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            res.json({accessToken});
        }else{
            res.sendStatus(401); //untauhorized
        }
    }
}
