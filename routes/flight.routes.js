const express = require("express")
const {flightModel} = require("../model/fight.model")
require("dotenv").config()


const flightRouter = express.Router()


flightRouter.post("/flights",async(req,res)=>{
    try{
        const data = req.body
        const newdata = new flightModel(data)
        await newdata.save()
        console.log(newdata)
        res.status(200).json({msg:"Flights are registerd sucessfully"})

    }
    catch(err){
        res.status(402).json({msg:"Something went wrong"})
    }
})

flightRouter.get("/flights",async(req,res)=>{
    try{
        const data = await flightModel.find()
        res.status(200).json({msg:"all flights are here!!",user:data})
    }
    catch(err){
        console.log(err)
        res.status(402).json({msg:'something went wrong to getting the flights'})
    }
})

flightRouter.get("/flights/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const flight = await flightModel.findById(id)
        if (!flight){
            return res.status(402).json({msg:"Flights Not Avalable"})
        }
        const FlightDetails = {
            airline: flight.airline,
            flightNo: flight.flightNo,
            departure: flight.departure,
            arrival: flight.arrival,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            seats: flight.seats,
            price: flight.price,
          };

        res.status(200).json({msg:"your Flights data are here",FlightDetails})

    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'Internal server errorrr'})
    }
})


//for update the flight data
flightRouter.put("/flights/:id",async(req,res)=>{
    const {id} = req.params
    const updatedata = req.body

    try{
        const flight = await flightModel.findByIdAndUpdate(id,updatedata,{new:true})

        if (!flight){
            return res.status(502).json({msg:"Flights not found"})
        }
        res.status(204).json({msg:"Flights are updated Sucessfully",flight})

    }
    catch(err){
        console.log(err)
        res.status(502).json({msg:"Internal server error"})
    }
})

flightRouter.delete("/flights/:id",async(req,res)=>{
     const {id} = req.params

     try{
        const flight = await flightModel.findByIdAndDelete(id)

        if (!flight){
            return res.status(501).json({msg:"Flights Not Foundd"})
        }

        res.status(202).json({msg:"Flights Deleted Sucessfully"})

     }
     catch(err){
        console.log(err)
        res.status(502).json({msg:"Something went wrongg"})
     }
})





module.exports = {
    flightRouter
}