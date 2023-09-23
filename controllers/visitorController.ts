import bcrypt = require('bcrypt');
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {UserRecord} from "../records/user.record";
import {AuthRecord} from "../records/auth.record";
import {User} from "../types/user";

export default class visitorController {
    static getPage =  async (req: Request, res: Response) => {
        console.log(req.param('id'))

        res.json(201)
    };
}
