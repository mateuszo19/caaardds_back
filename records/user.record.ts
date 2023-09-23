import {NewUser, User} from "../types/user";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {QueryResult} from "pg";

export class UserRecord implements User{
    public id: string;
    public username: string;
    public password: string;
    public roles: number[];

    constructor(obj: NewUser) {
        //@ts-ignore
        this.id = obj.id;
        this.username = obj.username;
        this.password = obj.password;
        this.roles = obj.roles;
    }

    async registerUser(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        }
        const rolesArray = this.roles.map(Number);
        await pool.query(
            `INSERT INTO users (id, username, password, roles) VALUES ($1, $2, $3, $4)`,
            [this.id, this.username, this.password, rolesArray]
            )
    }

    static async findUserByName(name:string): Promise<QueryResult<any>>{
        const result = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [name]
        )
        return result;
    }
}