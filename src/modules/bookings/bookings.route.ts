import { Request, Response, Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";



const router = Router();

router.post('/bookings',auth(),bookingsController.createBookings);
// router.get('/bookings',auth("customer"),bookingsController.getAllBookings);
router.get('/bookings',auth(),bookingsController.getAllBookings);

router.put('/bookings/:bookingId',auth(),bookingsController.updateBooking);


export const bookingsRoute= router;