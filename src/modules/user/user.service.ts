import { Request } from "express"
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
const updateUserFromDB=async (req:Request)=>{
    const {name,email,phone,role}=req.body
   const result= await pool.query(
            `UPDATE users SET name=$1 ,email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,[name,email,phone,role,req.params.id]
       )

    delete result.rows[0].password
    return result
}
const deleteUserFromDB=async (req:Request)=>{
   const result= await pool.query(
            `DELETE FROM users WHERE id=$1 RETURNING *`,[req.params.id]
       )
    return result
}

export const userService={
getAllUserFromDB,
updateUserFromDB,
deleteUserFromDB
}