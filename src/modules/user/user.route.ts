import { Request, Response, Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.post('/signin',userController.createUser);

export const userRoute= router;