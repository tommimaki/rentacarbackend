// models/Car.js
const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: String,
  description: String,
  // Add more fields as needed
});

CarSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Car", CarSchema);
