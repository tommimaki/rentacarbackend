// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./db"); // Import connectDB from db.js

//routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const userDataRoute = require("./routes/userDataRoute");
const carRoutes = require("./routes/carRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const demoLoginRoutes = require("./routes/demoLogin");

// Create a new Express application
const app = express();

//use cors
app.use(cors());

// Connect to the MongoDB database
connectDB();

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
// Use the new demo login route
app.use("/api/demo-login", demoLoginRoutes);
//info
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Car Rental API</h1><p>Please visit /api/users, /api/auth, /api/user, /api/cars, or /api/reservations for specific endpoints.</p>"
  );
});

module.exports = app; // Export the app for use in other files
