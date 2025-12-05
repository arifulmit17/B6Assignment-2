import { Request, Response } from "express"
import { userService } from "./user.service"

const createUser=async (req:Request ,res:Response)=>{
    try {
       
     const result=await userService.createUserIntoDB(req.body)
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

export const userController={
    createUser
}