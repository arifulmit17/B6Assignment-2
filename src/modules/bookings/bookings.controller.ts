
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
        res.status(404).json({
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
        // console.log(result);
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
    const userrole=req.user?.role
    const userid=req.user?.id
     const id=req.params.bookingId
        const booking=await bookingsService.getBookingById(id as string)
        const rentStart = new Date(booking.rent_start_date).getTime();
        const rentEnd = new Date(booking.rent_end_date).getTime();
    // console.log(userrole);
    try{

     
    if(userrole=="admin"){
        const result = await bookingsService.updateBookingFromDB(req)
    
    // console.log(result);
     
    if(!result){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Booking marked as returned. Vehicle is now available",
            data:result
        })
       }

    }
    if(userrole=="customer"){

        if(Date.now() > rentEnd){
        // console.log(Date.now(),rentEnd);
             
             const result = await bookingsService.updateBookingFromDBSystem(req)
             if(!result){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Booking marked as returned by system. Vehicle is now available",
            data:result
        })
       }

        }  
       
        // console.log(Date.now(),rentStart);
        if(Date.now() < rentStart){
          const result = await bookingsService.updateBookingFromDBCustomer(req,userid)
          if(result.rows.length===0){
       res.status(404).json({
        success:false,
        message:"Booking not found"
       })
    }
    else{
        res.status(200).json({
            success:true,
            message:"Booking cancelled successfully",
            data:result.rows[0]
        })
       }
        }else{
            res.status(400).json({
            success:false,
            message:"Booking cannot be cancelled as rent period started",
            
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


export const bookingsController={
   getAllBookings,
   updateBooking,
   createBookings
}