import {NewUser, User} from "../types/user";
import {Response, Request} from "express";
import bcrypt from "bcrypt"
import {UserRecord} from "../records/user.record";

export default class registerController {
    static handleNewUser = async (req: Request, res: Response) => {
        const {user, pwd} = req.body;
        if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required'});

        const duplicate = (await UserRecord.findUserByName(user)).rows.length;
        if(duplicate) return res.sendStatus(409); //conflict
        try{
            //encrypt password
            const hashedPwd = await bcrypt.hash(pwd, 10);
            //store new user
            const newUser: NewUser = {"username": user,"roles": [ 2001, 1984], "password": hashedPwd};
            const user1 = new UserRecord(newUser);
            await user1.registerUser();

            res.status(201).json({'success': `New user ${user} created`})
        }catch (err: any){
            res.status(500).json({'message': err.message})
        }
    }}