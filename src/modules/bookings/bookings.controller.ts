
import { Request, Response } from "express"
import { bookingsService } from "./bookings.service"

const createBookings=async (req:Request ,res:Response)=>{
    try {
       
     const result=await bookingsService.createBookingIntoDB(req.body)
    return res.status(201).json({
        success:true,
        message:"Booking created successfully",
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


const getAllBookings=async (req:Request,res:Response)=>{
    const userrole=req.user?.role
    const userid=req.user?.id
    
    // console.log(userrole,userid);
   try{
    if(userrole=="admin"){
        const result = await bookingsService.getAllBookingFromDB()
        
        if(result.length===0){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }else{
        res.status(200).json({
        success:true,
        message:"Bookings retrieved successfully",
        data:result
    })
    }
}
    if(userrole=="customer"){
        const result = await bookingsService.getAllBookingFromDBCustomer(userid)
        console.log(result);
        if(result.length===0){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }else{
        res.status(200).json({
        success:true,
        message:"Your bookings retrieved successfully",
        data:result
    })
    }

    }
    

   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        details:err
    })
   }
}

const updateBooking=async (req:Request,res:Response)=>{
    try{
    const result = await bookingsService.updateBookingFromDB(req)
    
    console.log(result);
     
    if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Booking updated successfully",
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


export const bookingsController={
   getAllBookings,
   updateBooking,
   createBookings
}