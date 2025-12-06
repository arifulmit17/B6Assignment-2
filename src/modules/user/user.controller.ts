import { request, Request, Response } from "express"
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

const updateUser=async (req:Request,res:Response)=>{
    try{
    const result = await userService.updateUserFromDB(req)
    
    console.log(result);
     
    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"User not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:result.rows[0]
        })
       }
    

   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        details:err
    })
   }
}
const deleteUser=async (req:Request,res:Response)=>{
    console.log(req.params.id);
    try{
    const result = await userService.deleteUserFromDB(req)
    
     
    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"User not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
            data:null
        })
       }
    

   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        details:err
    })
   }
}

export const userController={
   getAllUsers,
   updateUser,
   deleteUser
}