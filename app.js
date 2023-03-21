// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const userDataRoute = require("./routes/userDataRoute");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

// Create a new Express application
const app = express();

//use cors
app.use(cors());

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Include user routes
app.use("/api/users", userRoutes);
// User auth Route for login
app.use("/api/auth", authRoutes);
//User data for profile
app.use("/api/user", userDataRoute);
//User data for profile
app.use("/api/cars", carRoutes);
//for reservations
app.use("/api/reservations", reservationRoutes);

module.exports = app; // Export the app for use in other files
