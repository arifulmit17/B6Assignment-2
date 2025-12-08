import bcrypt from "bcryptjs"
import { pool } from "../../database/db"
import { Request, Response } from "express";


const createVehicleIntoDB=async(payload:Record<string,unknown>)=>{
 const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=payload
 const price = Number(daily_rent_price);
 if(price >= 0){
    if(type =='car' || type =='bike' || type =='van' || type =='SUV' ){
        if(availability_status =='available' || availability_status =='booked'){
       const result= await pool.query(
         `INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1, $2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status]
    )
return result
}else{
    throw new Error("Invalid availability status. It should be either 'available' or 'booked'.")
}
    
    }else{
        throw new Error("Invalid vehicle type. It should be either 'car', 'bike', 'van', or 'SUV'.")
    }

 }else{
    throw new Error("Daily rent price must be a non-negative number.")
 }
}

const getAllVehicleFromDB=async ()=>{
   const result= await pool.query(
            `SELECT * FROM vehicles`
       )
    for(let i=0;i<result.rows.length;i++){
      delete result.rows[i].password
    }
    
    return result
}
const getVehicleFromDB=async (req:Request)=>{
   const result= await pool.query(
            `SELECT * FROM vehicles WHERE id=$1 `,[req.params.vehicleId]
       )
    
    return result
}
const updateVehicleFromDB=async (req:Request)=>{
   const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body
 const price = Number(daily_rent_price);
 if(price >= 0){
    if(type =='car' || type =='bike' || type =='van' || type =='SUV' ){
        if(availability_status =='available' || availability_status =='booked'){
       const result= await pool.query(
         `UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.vehicleId]
    )
return result
}else{
    throw new Error("Invalid availability status. It should be either 'available' or 'booked'.")
}
    
    }else{
        throw new Error("Invalid vehicle type. It should be either 'car', 'bike', 'van', or 'SUV'.")
    }

 }else{
    throw new Error("Daily rent price must be a non-negative number.")
 }
}
const deleteVehicleFromDB=async (req:Request,res:Response)=>{
    const vehicle= await pool.query(
            `SELECT * FROM vehicles WHERE id=$1 `,[req.params.vehicleId]
       )
       console.log(vehicle.rows[0].availability_status);
    try{
        if(vehicle.rows[0].availability_status=="available"){
            const result= await pool.query(
            `DELETE FROM vehicles WHERE id=$1 RETURNING *`,[req.params.vehicleId]
       )
       console.log("result",result);
    return result

        }else{
            res.status(500).json({
        success:false,
        message:"vehicle is booked ,cannot delete"

       })
        }
        

    }catch(err){
       res.status(500).json({
        success:false,
        message:"vehicle not deleted"

       })
    }
   
}

export const vehicleService={
    createVehicleIntoDB,
    getAllVehicleFromDB,
    getVehicleFromDB,
    updateVehicleFromDB,
    deleteVehicleFromDB
}