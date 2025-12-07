import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";





const router = Router();

router.post('/vehicles',vehiclesController.createVehicles);
router.get('/vehicles',auth("admin"),vehiclesController.getAllVehicles);
router.get('/vehicles/:vehicleId',vehiclesController.getVehicle);
router.put('/vehicles/:vehicleId',auth("admin"),vehiclesController.updateVehicle);
router.delete('/vehicles/:vehicleId',auth("admin"),vehiclesController.deleteVehicle);

export const vehiclesRoute= router;