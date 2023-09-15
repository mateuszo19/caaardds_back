import {Request, Response, NextFunction} from "express";

export const verifyRoles = (...allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray: number[] = [...allowedRoles];
        console.log(rolesArray);
        //@ts-ignore
        console.log(req.roles);
        //@ts-ignore
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);// Unauthorized
        next();
    }
}