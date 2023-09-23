import express, {Request, Response} from "express";
import authController from "../controllers/authController";

export const authRoute = express();

authRoute.post('/', authController.handleLogin)

