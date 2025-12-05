import {Pool} from 'pg'

export const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_RwmQe6COpbi3@ep-restless-sound-a8mxdfkg-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
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