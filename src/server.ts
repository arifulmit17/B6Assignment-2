import express from 'express'
import { initDB } from './database/db'
import { authRoute } from './modules/auth/auth.route'

const app=express()
app.use(express.json())


initDB()

app.use('/api/v1/auth',authRoute)

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is running",
        path:req.path

    })
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})