import { Request, Response, Router } from "express";
import { bookingsController } from "./bookings.controller";



const router = Router();

router.post('/bookings',bookingsController.createBookings);
router.get('/bookings',bookingsController.getAllBookings);
router.put('/bookings/:bookingId',bookingsController.updateBooking);


export const bookingsRoute= router;