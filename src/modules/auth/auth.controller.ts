import { Request, Response } from "express"
import { authService } from "./auth.service"


const createUser=async (req:Request ,res:Response)=>{
    try {
       
     const result=await authService.createUserIntoDB(req.body)
    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:result
    })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}
const loginUser=async (req:Request ,res:Response)=>{
    try {
       const {email,password}=req.body

     const result=await authService.loginUserIntoDB(email,password)
    return res.status(200).json({
        success:true,
        message:"Login successfull",
        data:result
    })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}

export const authController={
    createUser,
    loginUser
}