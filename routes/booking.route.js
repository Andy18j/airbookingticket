const express = require("express")
const {userModel} = require("../model/user.model")
const {flightModel} = require("../model/fight.model")
const {bookingModel} = require("../model/booking.model")
const { Module } = require("module")

const bookingRouter = express.Router()

bookingRouter.post("/booking", async (req, res) => {
    const { userId, flightId } = req.body;
    try {
        const user = await userModel.findById(userId);
        const flight = await flightModel.findById(flightId);

        if (!user || !flight) {
            return res.status(404).json({ msg: "User or flight not found in the database" });
        }
        const newBooking = new bookingModel({
            user: userId,
            flight: flightId,
            bookingDate: new Date()
        });

        await newBooking.save();
        res.status(201).json({ msg: "Flight booked successfully", newBooking });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

bookingRouter.get("/dashboard", async (req, res) => {
    try {
      const bookings = await bookingModel.find().populate("user").populate("flight");
  
      if (bookings.length === 0) {
        return res.status(404).json({ msg: "No bookings found" });
      }
  
      res.status(200).json({ bookings });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong" });
    }
  });

  bookingRouter.put("/dashboard/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedBooking = await bookingModel.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedBooking) {
        return res.status(404).json({ msg: "Booking not found" });
      }
  
      res.status(200).json({ msg: "Booking updated successfully", booking: updatedBooking });
    } catch (err) {
      res.status(500).json({ msg: "Internal server error" });
    }
  });


  bookingRouter.delete("/dashboard/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedBooking = await bookingModel.findByIdAndDelete(id);
  
      if (!deletedBooking) {
        return res.status(404).json({ msg: "Booking not found" });
      }
  
      res.status(200).json({ msg: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  });

module.exports = {
    bookingRouter
}