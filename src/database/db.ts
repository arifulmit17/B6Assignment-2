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
    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(10) NOT NULL,
        registration_number VARCHAR(100) UNIQUE NOT NULL,
        daily_rent_price NUMERIC NOT NULL,
        availability_status VARCHAR(10) NOT NULL
    )
    `)
    console.log("user connected");
}