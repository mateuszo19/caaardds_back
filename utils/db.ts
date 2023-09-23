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
                roles INT[]
            );
        `);
    }catch(err){
        console.log(err)
    }
    try{
        await client.query(`
            CREATE TABLE IF NOT EXISTS websites (
                id VARCHAR(64) UNIQUE PRIMARY KEY,
                user_id VARCHAR(64) UNIQUE,
                name VARCHAR(64),
                type VARCHAR(8),
                link VARCHAR(256),
                counter INTEGER
            );
        `);
    }catch(err){
        console.log(err)
    }
}

createTables();
