import express, {Request, Response} from "express";

export const authenticationRouter = express();

authenticationRouter
    .get("/", (req: Request, res: Response) => {
        res.status(200).send('Authentication router');
    })
    .post("/create-account", (req: Request, res:Response) => {
        res.send("Create account");
    })
    .post("/login", (req: Request, res:Response) => {
        res.send("Login");
    })
    .post("/remind-password", (req: Request, res: Response) => {
        res.send("Remind password")
    })
