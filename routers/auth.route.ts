import express, {Request, Response} from "express";
import passport from "passport";
import authController from "../controllers/authController";

export const authRoute = express();

authRoute.post('/', authController.handleLogin)

