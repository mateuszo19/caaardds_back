import express, {Request, Response} from "express";

export const userRouter = express();

userRouter
    .get("/", (req: Request, res: Response) => {
        res.status(200).send('User router');
    })
    .get("/user/:id", (req: Request, res:Response) => {
        res.send("All data of user");
    })