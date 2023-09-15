import express, {Request, Response} from "express";

import refreshTokenController from "../controllers/refreshTokenController";

export const refreshRoute = express();

refreshRoute.get('/', refreshTokenController.handleRefreshToken)

