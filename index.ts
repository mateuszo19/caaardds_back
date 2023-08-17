import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
//Routers
import {cardRouter} from "./src/routes/card.router";
import {userRouter} from "./src/routes/user.router";
import {authenticationRouter} from "./src/routes/authentication.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.use('/card', cardRouter);
app.use('/user', userRouter);
app.use('/authentication', authenticationRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});