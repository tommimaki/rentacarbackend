// db.js
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB.");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error.message);
    logger.info(config.MONGODB_URI);
  }
};

module.exports = { connectDB };
