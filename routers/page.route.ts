import express, {Request, Response} from "express";
import authController from "../controllers/authController";
import pageController from "../controllers/pageController";

export const pageRoute = express();

pageRoute.get('/:id', pageController.getPage)

