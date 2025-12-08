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

const getAllVehicles=async (req:Request,res:Response)=>{
   try{
    const result = await vehicleService.getAllVehicleFromDB()
     
    res.status(200).json({
        success:true,
        message:"Vehicles retrieved successfully",
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
const getVehicle=async (req:Request,res:Response)=>{
   try{
    const result = await vehicleService.getVehicleFromDB(req)
     
    res.status(200).json({
        success:true,
        message:"Vehicle retrieved successfully",
        data:result.rows[0]
    })

   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        details:err
    })
   }
}

const updateVehicle=async (req:Request,res:Response)=>{
    try{
    const result = await vehicleService.updateVehicleFromDB(req)
     
    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"Vehicle not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Vehicle updated successfully",
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
const deleteVehicle=async (req:Request,res:Response)=>{
    try{
    const result = await vehicleService.deleteVehicleFromDB(req,res)
    
     
    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"Vehicle not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Vehicle deleted successfully",
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


export const vehiclesController={
    createVehicles,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
}