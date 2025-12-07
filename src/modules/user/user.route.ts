import { Request, Response, Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router();


router.get('/users',auth("admin"),userController.getAllUsers);
router.put('/users/:userid',userController.updateUser);
router.delete('/users/:userId',auth("admin"),userController.deleteUser);

export const userRoute= router;