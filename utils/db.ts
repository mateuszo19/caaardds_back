import {Pool, QueryResult} from "pg";
import {dbConfig} from "../config/dbConfig";

console.log(dbConfig)

export const pool = new Pool(dbConfig);

export async function createTables(){
    const client = await pool.connect();
    try{
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(64) UNIQUE PRIMARY KEY,
                username VARCHAR(64) UNIQUE,
                password VARCHAR(100),
                refresh_token VARCHAR(256),
                roles VARCHAR(14)
            );
        `);
    }catch(err){
        console.log(err)
    }
}

createTables();
