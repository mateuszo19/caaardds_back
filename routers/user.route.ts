import express, {Request, Response} from "express";
import {ROLES_LIST} from "../config/rolesList";
import {verifyRoles} from "../middleware/verifyRoles";

export const userRoute = express();



userRoute.route("/")
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),(req: Request, res: Response) => {
        console.log('Get all user');
        res.status(200).json({
            "name": "Adam"
        });//ok
    })
    .delete(verifyRoles(ROLES_LIST.Admin),(req: Request, res: Response) => {
        console.log('Delete all user');
        res.status(200).json({
            "name": "Adam"
        });//ok
    })
