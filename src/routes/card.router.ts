import express, {Request, Response} from "express";

export const cardRouter = express();

cardRouter
    .get("/", (req: Request, res: Response) => {
        res.status(200).send('Card router');
    })
    .get("/user/:id", (req: Request, res:Response) => {
        res.send("All cards of user");
    })
    .get("/card/:id", (req: Request, res:Response) => {
        res.send("Full data of one card")
    })

