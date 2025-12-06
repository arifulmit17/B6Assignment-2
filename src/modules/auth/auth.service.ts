import bcrypt from "bcryptjs"
import { pool } from "../../database/db"
import jwt from "jsonwebtoken"


const createUserIntoDB=async(payload:Record<string,unknown>)=>{
 const {name,email,password,phone,role}=payload
    if(String(password).length>5){
        const hashpassword=await bcrypt.hash(password as string,12)
         const result= await pool.query(
         `INSERT INTO users (name, email,password,phone,role) VALUES ($1, $2,$3,$4,$5) RETURNING *`,[name,email,hashpassword,phone,role]
    )
    delete result.rows[0].password

    return result.rows[0];
    }else{
        throw new Error("Password length must be 6 or above")
        
    }
    
    
   
}
const loginUserIntoDB=async(email:string,password:string)=>{
   
    console.log({email});
    
    const result= await pool.query(
         `SELECT * FROM users WHERE email=$1`,[email]
    )
    console.log({result});
    if(result.rows.length===0){
        return null
    }
    const user=result.rows[0]
    const match=await bcrypt.compare(password,user.password)
    console.log({match,user});
    if(!match){
        return false
    }

    const secret="KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
    const token=jwt.sign({name:user.name,role:user.role},secret,{expiresIn:'7d'})
    console.log(token);
    return {token,user}
}

export const authService={
    createUserIntoDB,
    loginUserIntoDB
}