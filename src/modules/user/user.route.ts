import { Request, Response, Router } from "express";
import { userController } from "./user.controller";


const router = Router();


router.get('/users',userController.getAllUsers);
router.put('/users/:userId',userController.updateUser);
// router.delete('/users/:userId',userController.deleteUser);

export const userRoute= router;