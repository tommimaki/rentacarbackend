// tests/reservationRoutes.test.js

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

describe("Reservation routes", () => {
  test("POST /api/reservations/ should create a new reservation", async () => {
    const newReservation = {
      user: new mongoose.Types.ObjectId(),
      carId: new mongoose.Types.ObjectId(),
      carMake: "testCarMake",
      carModel: "testCarModel",
      startDate: "2023-01-01",
      endDate: "2023-01-05",
      totalPrice: 1000,
    };

    const response = await request(app)
      .post("/api/reservations/")
      .send(newReservation);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newReservation);
    // Clean up: delete the created reservation
    await Reservation.deleteOne({ _id: response.body._id });
  });

  test("GET /api/reservations/car/:carId should return reservations for a car", async () => {
    const carId = "testCarId";
    const response = await request(app).get(`/api/reservations/car/${carId}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /api/reservations/ should return all reservations", async () => {
    const response = await request(app).get("/api/reservations/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
