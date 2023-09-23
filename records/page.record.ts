import {pool} from "../utils/db";
import {User} from "../types/user";
import {WebsiteInterface } from "../types/website";

export class PageRecord{
    static async updateCounter(id: string){
        await pool.query(
            `UPDATE websites SET counter = counter + 1 WHERE id = $1`,
            [id]
            )
    }
    static async getPage(id: string): Promise<WebsiteInterface>{
        const response = await pool.query(
            `SELECT * FROM websites WHERE id = $1`,
            [id]
        )
        return response.rows[0];
    }
}
