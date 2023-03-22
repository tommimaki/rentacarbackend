// server.js

require("dotenv").config();
const config = require("./utils/config");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const app = require("./app");
const { connectDB } = require("./db");

global.gfs = null;

mongoose.connection.once("open", () => {
  const { GridFSBucket } = require("mongodb");
  global.gfs = new GridFSBucket(mongoose.connection.db);
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = server;
