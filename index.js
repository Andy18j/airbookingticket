const express = require("express")
const { connection } = require("mongoose")
const { userRouter } = require("./routes/user.routes")
const config = require("./config/db")
const { flightRouter } = require("./routes/flight.routes")
const { bookingRouter } = require("./routes/booking.route")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/api",userRouter)
app.use("/api",flightRouter)
app.use("/api",bookingRouter)


app.get("/",(req,res)=>{
    res.send("HOME PAGEE🏠")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected TO THE DB")

    }
    catch(err){
        console.log("Not Connected To The DB")
    }
    console.log(`port is running at the ${process.env.port}`)
})