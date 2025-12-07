import { Response,NextFunction, Request } from "express";
import config from "../config";
import  jwt  from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const auth=(...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            const authtoken=req.headers.authorization
            const token=authtoken?.split(" ")[1];
            // console.log(token);
        if(!token){
            res.status(500).json({
                message:"You are not allowed!"
            })
        }
        // console.log(roles);
        const decoded=jwt.verify(token,config.jwtSecret as string) as JwtPayload
        // console.log({decoded});
        req.user=decoded 
        if(roles.length && !roles.includes(decoded.role as string)){
            return res.status(401).json({
                error:"Unauthorized !!!"
                
            })
        }
        return next();

        }catch(err: any){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
        
    }
}
export default auth