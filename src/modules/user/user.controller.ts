import { Request, Response } from "express"
import { userService } from "./user.service"
import { pool } from "../../database/db"

const getAllUsers=async (req:Request,res:Response)=>{
   try{
    const result = await userService.getAllUserFromDB()
     
    res.status(200).json({
        success:true,
        message:"Users retrieved successfully",
        data:result.rows
    })

   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        details:err
    })
   }
}

export const userController={
   getAllUsers
}