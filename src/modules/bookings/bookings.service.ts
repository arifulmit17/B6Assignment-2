import { Request } from "express"
import { pool } from "../../database/db"




const createBookingIntoDB=async(payload:Record<string,unknown>)=>{
 let {customer_id,vehicle_id,rent_start_date,rent_end_date,status}=payload
 if(!status){
   status="active"
 }else{
    status="cancelled"
 }
 const vehicle=await pool.query(`SELECT * FROM vehicles WHERE id=$1 `,[vehicle_id])
 const {vehicle_name,daily_rent_price}=vehicle.rows[0]
 const start = new Date(rent_start_date).getTime();
const end = new Date(rent_end_date).getTime();

if (isNaN(start) || isNaN(end)) {
  throw new Error("Invalid date format");
}

const number_of_days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

// console.log("Days:", number_of_days);

if (end <= start) {
  throw new Error("End date must be after start date");
}


const total_price = daily_rent_price * number_of_days
//  console.log(payload);

 
   
        if(status =='active' || status =='cancelled' || status=='returned'){
       let result= await pool.query(
        `INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`,[customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status]
    )
    const booking={
  ...result.rows[0],
  vehicle: {vehicle_name,daily_rent_price},
}
// console.log(booking);
return booking
}else{
    throw new Error("Invalid availability status")
}
    

 
}

const getAllBookingFromDBCustomer=async (userid)=>{
    // console.log(userid);
   const result= await pool.query(
            `SELECT * FROM bookings WHERE customer_id=$1`,[userid]
       )


    const bookings = [];

for (let i = 0; i < result.rows.length; i++) {
  const booking = result.rows[i];

  const vehicleRes = await pool.query(
    "SELECT * FROM vehicles WHERE id=$1",
    [booking.vehicle_id]
  );
  const {vehicle_name,registration_number,type}=vehicleRes.rows[0]
  const combined = {
    ...booking,
    vehicle: {vehicle_name,registration_number,type},
  };

  bookings.push(combined);
}
// console.log(bookings);
return bookings;

    
    
}
const getAllBookingFromDB=async ()=>{
   const result= await pool.query(
            `SELECT * FROM bookings`
       )


    const bookings: any[] = [];

for (let i = 0; i < result.rows.length; i++) {
  const booking = result.rows[i];

  const customerRes = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [booking.customer_id]
  );

  const vehicleRes = await pool.query(
    "SELECT * FROM vehicles WHERE id=$1",
    [booking.vehicle_id]
  );
  const {vehicle_name,registration_number}=vehicleRes.rows[0]
  const {name,email}=customerRes.rows[0]
  
  const combined = {
    ...booking,
    customer: {name,email},
    vehicle: {vehicle_name,registration_number},
  };

  bookings.push(combined);
}
// console.log(bookings);
return bookings;

    
    
}

const updateBookingFromDB=async (req:Request)=>{
   const {status}=req.body
 
 
    
        if(status =='active' || status =='cancelled' || status=='returned'){
       const result= await pool.query(
         `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,[status,req.params.bookingId]
    )
return result
}else{
    throw new Error("Invalid availability status.")
}
    
    }
const updateBookingFromDBCustomer=async (req:Request,userid)=>{
   const {status}=req.body
//    console.log("booking id",req.params.bookingId);
//    console.log(userid);
 
 
    
        if(status =='active' || status =='cancelled' || status=='returned'){
       const result= await pool.query(
         `UPDATE bookings SET status=$1 WHERE customer_id=$2 AND id=$3 RETURNING *`,[status,userid,req.params.bookingId]
    )
return result
}else{
    throw new Error("Invalid availability status.")
}
    
    }



export const bookingsService={
    createBookingIntoDB,
    getAllBookingFromDBCustomer,
    getAllBookingFromDB,
    updateBookingFromDB,
    updateBookingFromDBCustomer
   
}