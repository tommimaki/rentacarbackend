require("dotenv").config();
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
const { GridFsStorage } = require("multer-gridfs-storage");

//TODO config file
const PASS = process.env.PASS;
const mongoURI = `mongodb+srv://admin:${PASS}@rentacar.bhctcbl.mongodb.net/?retryWrites=true&w=majority`;

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
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

// Add a car
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { make, model, year, description, price } = req.body;
    const image = req.file;

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
      ...(image && { imageUrl: `/api/cars/image/${image.filename}` }),
    });
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
  try {
    const { filename } = req.params;
    const file = await gfs.files.findOne({ filename });

    if (!file || file.length === 0) {
      return res.status(404).json({ message: "Image not found." });
    }

    const readStream = gfs.createReadStream({ filename });
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the image.",
      error,
    });
  }
});

module.exports = router;
