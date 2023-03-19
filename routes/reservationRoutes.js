const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const mongoose = require("mongoose");
const logger = require("../utils/logger");
// Create a new reservation

router.post("/", async (req, res) => {
  try {
    const { user, car, startDate, endDate, totalPrice } = req.body;
    logger.info(`Creating reservation for user ${user} and car ${car}`);
    const reservation = new Reservation({
      user,
      car,
      startDate,
      endDate,
      totalPrice,
    });
    await reservation.save();
    res.status(201).json(reservation);
    logger.info(`Reservation created successfully`);
  } catch (error) {
    console.error("Error creating reservation:", error);
    logger.error(`An error occurred while creating the reservation: ${error}`);
    res
      .status(500)
      .json({ message: "An error occurred while creating the reservation." });
  }
});

// get reservationsby car
router.get("/car/:carId", async (req, res) => {
  try {
    const reservations = await Reservation.find({ car: req.params.carId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find({})
      .populate("user")
      .populate("car");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving reservations." });
  }
});

// Get a single reservation by ID
router.get("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId)
      .populate("user")
      .populate("car");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the reservation." });
  }
});

// Update a reservation
router.put("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }
    const { userId, carId, startDate, endDate, totalPrice } = req.body;
    reservation.user = userId;
    reservation.car = carId;
    reservation.startDate = startDate;
    reservation.endDate = endDate;
    reservation.totalPrice = totalPrice;
    await reservation.save();
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the reservation." });
  }
});

// Delete a reservation
router.delete("/:reservationId", async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      console.log("Reservation not found:", reservationId);
      return res.status(404).json({ message: "Reservation not found." });
    }

    await Reservation.deleteOne({ _id: reservationId });

    console.log("Reservation removed successfully:", reservationId);
    res.status(200).json({ message: "Reservation removed successfully." });
  } catch (error) {
    console.error("Error while removing the reservation:", error);
    res.status(500).json({
      message: "An error occurred while removing the reservation.",
      error,
    });
  }
});

module.exports = router;
