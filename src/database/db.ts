import {Pool} from 'pg'
import config from '../config';

export const pool = new Pool({
    connectionString: `${config.connection_str}`
})

export const initDB=async()=>{
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(50) NOT NULL
    )
    `)
    console.log("user connected");
}