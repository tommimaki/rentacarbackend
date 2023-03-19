require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./utils/logger");

//routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const userDataRoute = require("./routes/userDataRoute");
const carRoutes = require("./routes/carRoutes");

// Create a new Express application
const app = express();
//use cors
app.use(cors());
// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB.");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
    logger.info(config.MONGODB_URI);
  });

global.gfs = null;

mongoose.connection.once("open", () => {
  const { GridFSBucket } = require("mongodb");
  global.gfs = new GridFSBucket(mongoose.connection.db);
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
