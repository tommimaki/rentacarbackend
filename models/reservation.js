const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
    required: true,
  },
  carId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Car",
    type: String,
    required: true,
  },
  carMake: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reservationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
