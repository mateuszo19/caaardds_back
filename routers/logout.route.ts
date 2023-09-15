import express, {Request, Response} from "express";

import logoutController from "../controllers/logoutController";

export const logoutRoute = express();

logoutRoute.get('/', logoutController.handleLogout)

