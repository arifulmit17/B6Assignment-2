import { Request } from "express"
import { pool } from "../../database/db"




const createBookingIntoDB=async(payload:Record<string,unknown>)=>{
  try{
 let {customer_id,vehicle_id,rent_start_date,rent_end_date,status}=payload
 if(!status){
   status="active"
 }else{
    status="cancelled"
 }
 const result = await pool.query(
  `SELECT * FROM vehicles WHERE id = $1`,
  [vehicle_id]
)
// console.log(result);

const vehicle = result.rows[0]

if (!vehicle) {
  throw new Error("Vehicle not found")
}

const { vehicle_name, daily_rent_price } = vehicle

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
catch (error : any) {
  throw new Error(error.message || "Failed to create booking")
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
  const {vehicle_name,registration_number}=vehicleRes?.rows[0]
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

const getBookingById=async(bookingId:string)=>{

 const result = await pool.query(
  `SELECT * FROM bookings WHERE id=$1`,
  [bookingId]
  
);

  const booking = result.rows[0];

if (!booking) {
  throw new Error("Booking not found");
}

return booking;

}
const getBookingByVehicleId=async(vehicleId:string)=>{

 const result = await pool.query(
  `SELECT * FROM bookings WHERE vehicle_id=$1`,
  [vehicleId]
  
);

  const booking = result.rows[0];

if (!booking) {
  throw new Error("Booking not found");
}

return booking;

}

const updateBookingFromDB = async (req: Request) => {
  const { status } = req.body;

  if (status !== "active" && status !== "cancelled" && status !== "returned") {
    throw new Error("Invalid availability status.");
  }

  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, req.params.bookingId]
  );

  const booking = result.rows[0];

  if (!booking) {
    throw new Error("Booking not found");
  }

  const vehicleRes = await pool.query(
    `SELECT availability_status FROM vehicles WHERE id=$1`,
    [booking.vehicle_id]
  );

  const vehicle = vehicleRes.rows[0];
  const combined={
 ...booking,
    vehicle: {
      availability_status: vehicle?.availability_status || null,
    },
  }
  return combined;
};
const updateBookingFromDBSystem = async (req: Request) => {
  const  status  = "returned";

  

  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, req.params.bookingId]
  );

  const booking = result.rows[0];

  if (!booking) {
    throw new Error("Booking not found");
  }

  const vehicleRes = await pool.query(
    `SELECT availability_status FROM vehicles WHERE id=$1`,
    [booking.vehicle_id]
  );

  const vehicle = vehicleRes.rows[0];
  const combined={
 ...booking,
    vehicle: {
      availability_status: vehicle?.availability_status || null,
    },
  }
  return combined;
};


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
    getBookingById,
    getBookingByVehicleId,
    updateBookingFromDB,
    updateBookingFromDBCustomer,
    updateBookingFromDBSystem,
   
}