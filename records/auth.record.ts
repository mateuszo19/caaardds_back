import {pool} from "../utils/db";
import {User} from "../types/user";

export class AuthRecord{
    static async updateToken(id: string, token: string){
        await pool.query(
            `UPDATE users SET refresh_token = $1 WHERE id = $2`,
            [token, id]
        )
    }
    static async findUserByToken(token: string): Promise<User>{
        const result = await pool.query(
            `SELECT * FROM users WHERE refresh_token = $1`,
            [token]
        );
        return result.rows[0];
    }
    static async deleteToken(id: string){
        await pool.query(
            `UPDATE users SET refresh_token = null WHERE id = $1`,
            [id]
        )
    }
}
