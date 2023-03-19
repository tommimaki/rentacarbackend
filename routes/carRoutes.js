require("dotenv").config();
const config = require("../utils/config");
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const { Readable } = require("stream");
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoURI = config.MONGODB_URI;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads.files",
    };
  },
});

const upload = multer({ storage });

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving cars.", error });
  }
});

// Get a single car by ID
router.get("/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }
    res.status(200).json(car);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the car.", error });
  }
});

// Add a car
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { make, model, year, description, price } = req.body;
    const image = req.file;

    console.log("Image file received: ", image);
    if (!make || !model || !year) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newCar = new Car({
      make,
      model,
      year,
      description,
      price,
    });

    if (image) {
      newCar.imageUrl = `/api/cars/image/${image.filename}`;
    }

    console.log("New car instance: ", newCar);
    await newCar.save();

    res.status(201).json({ message: "Car added successfully.", car: newCar });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the car.", error });
  }
});

// Edit a car
router.put("/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const { make, model, year, description, price } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    if (make) car.make = make;
    if (model) car.model = model;
    if (year) car.year = year;
    if (description) car.description = description;
    if (price) car.price = price;

    await car.save();

    res.status(200).json({ message: "Car updated successfully.", car });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the car.", error });
  }
});

// Remove a car
router.delete("/:carId", async (req, res) => {
  console.log("DELETE request received:", req.params);
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId);

    if (!car) {
      console.log("Car not found:", carId);
      return res.status(404).json({ message: "Car not found." });
    }

    await Car.deleteOne({ _id: carId });

    console.log("Car removed successfully:", carId);
    res.status(200).json({ message: "Car removed successfully." });
  } catch (error) {
    console.error("Error while removing the car:", error);
    res
      .status(500)
      .json({ message: "An error occurred while removing the car.", error });
  }
});

router.get("/image/:filename", async (req, res) => {
  const filename = req.params.filename;
  console.log(`Image requested: ${filename}`);

  const db = mongoose.connection.db; // Use the existing connection
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads.files",
  });

  try {
    console.log("Finding the file in the bucket.");
    const files = await bucket.find({ filename }).toArray();
    console.log("Files found:", files);

    if (!files || files.length === 0) {
      console.log(`Image not found: ${filename}`);
      return res.status(404).json({ message: "Image not found." });
    }

    console.log(`Found file: ${JSON.stringify(files[0])}`);

    if (
      files[0].contentType === "image/jpeg" ||
      files[0].contentType === "image/png"
    ) {
      const readStream = bucket.openDownloadStreamByName(filename);
      readStream.pipe(res);
      readStream.on("error", (err) => {
        console.log(`Error streaming the image: ${err}`);
        res.status(500).json({
          message: "An error occurred while streaming the image.",
          error: err,
        });
      });
      readStream.on("finish", () => {
        console.log(`Image streamed: ${filename}`);
      });
    } else {
      console.log(
        `Unsupported content type: ${files[0].contentType}, filename: ${filename}`
      );
      res.status(404).json({ message: "Image not found." });
    }
  } catch (err) {
    console.log(`Error retrieving the image: ${err}`);
    return res.status(500).json({
      message: "An error occurred while retrieving the image.",
      error: err,
    });
  }
});

module.exports = router;
