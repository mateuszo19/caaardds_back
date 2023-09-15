import dotenv from "dotenv";

dotenv.config();

const {
    DB_USER,
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
} = process.env;

export const dbConfig = {
    user:DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
}