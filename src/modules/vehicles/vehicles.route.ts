import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";





const router = Router();

router.post('/vehicles',vehiclesController.createVehicles);
router.get('/vehicles',vehiclesController.getAllVehicles);
router.get('/vehicles/:vehicleId',vehiclesController.getVehicle);
router.put('/vehicles/:vehicleId',vehiclesController.updateVehicle);
router.delete('/vehicles/:vehicleId',vehiclesController.deleteVehicle);

export const vehiclesRoute= router;