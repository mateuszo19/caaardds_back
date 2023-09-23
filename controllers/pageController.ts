import {Request, Response} from 'express';
import * as fsPromises from 'fs/promises'
import path from "path";
import {AuthRecord} from "../records/auth.record";
import { PageRecord } from "../records/page.record";

export default class pageController {
    static getPage =  async (req: Request, res: Response) => {
        console.log(req.param('id'))
        const page = await PageRecord.getPage(req.param('id'))
        await  PageRecord.updateCounter(page.id);
        res.json(page)
    };
}
