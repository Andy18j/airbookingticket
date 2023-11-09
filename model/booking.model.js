const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const bookingSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    flight: { type: ObjectId, ref: 'Flight' },
    bookingDate: { type: Date, default: Date.now, required: true }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    bookingModel
};