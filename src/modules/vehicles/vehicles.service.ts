import bcrypt from "bcryptjs"
import { pool } from "../../database/db"


const createVehicleIntoDB=async(payload:Record<string,unknown>)=>{
    console.log(payload);
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

export const vehicleService={
    createVehicleIntoDB
}