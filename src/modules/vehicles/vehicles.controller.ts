import { Request, Response } from "express"
import { vehicleService } from "./vehicles.service"



const createVehicles=async (req:Request ,res:Response)=>{
    try {
       
     const result=await vehicleService.createVehicleIntoDB(req.body)
    return res.status(201).json({
        success:true,
        message:"Vehicle created successfully",
        user:result.rows[0]
    })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}

export const vehiclesController={
    createVehicles
}