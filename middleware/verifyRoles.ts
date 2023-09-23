import {Request, Response, NextFunction} from "express";

interface CustomRequest extends Request {
    roles?: number[];
}

export const verifyRoles = (...allowedRoles: number[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray: number[] = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);// Unauthorized
        next();
    }
}