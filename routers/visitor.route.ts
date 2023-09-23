import express, {Request, Response} from "express";
import authController from "../controllers/authController";
import visitorController from "../controllers/visitorController";

export const visitorRoute = express();

visitorRoute.get('/:id', visitorController.getPage)

