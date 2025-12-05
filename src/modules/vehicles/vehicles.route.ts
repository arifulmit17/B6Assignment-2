import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";





const router = Router();

router.post('/vehicles',vehiclesController.createVehicles);

export const vehiclesRoute= router;