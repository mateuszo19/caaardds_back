import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {corsOptions} from "./config/corsOptions";
import cookieParser from "cookie-parser"
import {createTables, pool} from "./utils/db";
//Routes
import {authRoute} from "./routers/auth.route";
import {userRoute} from "./routers/user.route";
import {registerRoute} from "./routers/register.route";
import {refreshRoute} from "./routers/refresh.route";
//Middlewares
import {verifyJWT} from "./middleware/verifyJWT";
import {logoutRoute} from "./routers/logout.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
//Init db
(async () => {
  await pool.connect();
  createTables();
})();
//Middleware for json
app.use(express.json());
//Cross Origin Resource Sharing
app.use(cors(corsOptions))
//Middleware for cookies
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  next();
})
app.use('/authenticate', authRoute);
app.use('/register', registerRoute);
app.use('/refresh', refreshRoute)
app.use('/logout', logoutRoute)
//Protected
app.use(verifyJWT);
app.use('/user', userRoute);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});