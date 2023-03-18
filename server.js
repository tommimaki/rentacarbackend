const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");
require("dotenv").config();

// Create a new Express application
const app = express();
app.use(cors());
// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

const PASS = process.env.PASS;
// Connect to the MongoDB database
mongoose.connect(
  `mongodb+srv://admin:${PASS}@rentacar.bhctcbl.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Include user routes
app.use("/api/users", userRoutes);

// Set up the routes
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
