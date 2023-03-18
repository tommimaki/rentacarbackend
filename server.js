require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const userDataRoute = require("./routes/userDataRoute");
const carRoutes = require("./routes/carRoutes");

//pic stuff
const Grid = require("gridfs-stream");

// Create a new Express application
const app = express();
//use cors
app.use(cors());
// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

const PASS = process.env.PASS;
const mongoURI = `mongodb+srv://admin:${PASS}@rentacar.bhctcbl.mongodb.net/?retryWrites=true&w=majority`;

// Connect to the MongoDB database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Include user routes
app.use("/api/users", userRoutes);
// User auth Route for login
app.use("/api/auth", authRoutes);
//User data for profile
app.use("/api/user", userDataRoute);
//User data for profile
app.use("/api/cars", carRoutes);
// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
