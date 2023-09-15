import express, {Request, Response} from "express";
import registerController from "../controllers/registerController"

export const registerRoute = express();

registerRoute.post('/', registerController.handleNewUser)
