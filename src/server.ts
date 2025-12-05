import express from 'express'
import { initDB } from './database/db'
import { authRoute } from './modules/auth/auth.route'
import config from './config'
import { vehiclesRoute } from './modules/vehicles/vehicles.route'


const app=express()
app.use(express.json())
const port=config.port 

initDB()

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/',vehiclesRoute)

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is running",
        path:req.path

    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})