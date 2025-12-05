import { Request, Response } from "express"
import { authService } from "./auth.service"


const createUser=async (req:Request ,res:Response)=>{
    try {
       
     const result=await authService.createUserIntoDB(req.body)
    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:result.rows[0]
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error
        })
    }
}

export const authController={
    createUser
}