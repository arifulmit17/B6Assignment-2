import { pool } from "../../database/db"


const getAllUserFromDB=async ()=>{
   const result= await pool.query(
            `SELECT * FROM users`
       )
    for(let i=0;i<result.rows.length;i++){
      delete result.rows[i].password
    }
    
    return result
}

export const userService={
getAllUserFromDB
}