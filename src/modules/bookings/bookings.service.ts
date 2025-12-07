


const createBookingIntoDB=async(payload:Record<string,unknown>)=>{
 const {customer_id,vehicle_id,rent_start_date,rent_end_date}=payload
 
 if(price >= 0){
    if(type =='car' || type =='bike' || type =='van' || type =='SUV' ){
        if(availability_status =='available' || availability_status =='booked'){
       const result= await pool.query(
         `INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date) VALUES ($1, $2,$3,$4) RETURNING *`,[customer_id,vehicle_id,rent_start_date,rent_end_date]
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

const getAllBookingFromDB=async ()=>{
   const result= await pool.query(
            `SELECT * FROM vehicles`
       )
    for(let i=0;i<result.rows.length;i++){
      delete result.rows[i].password
    }
    
    return result
}

const updateBookingFromDB=async (req:Request)=>{
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

export const bookingsService={
    createBookingIntoDB,
    getAllBookingFromDB,
    updateBookingFromDB
   
}