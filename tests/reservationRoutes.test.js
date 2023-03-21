// tests/reservationRoutes.test.js
const server = require("../server");

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Reservation = require("../models/reservation");

const testCarID = "6419d65fed4df9b09707839c";
let testReservationId;

describe("Reservation routes", () => {
  test("POST /api/reservations/ should create a new reservation", async () => {
    const newReservation = {
      user: "6419d65fed4df9b09707839b",
      carId: testCarID,
      carMake: "testCarMake",
      carModel: "testCarModel",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "2023-01-05T00:00:00.000Z",
      totalPrice: 1000,
    };

    const response = await request(app)
      .post("/api/reservations/")
      .send(newReservation);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newReservation);
    testReservationId = response.body.id;
    console.log("Created test reservation ID:", testReservationId);
  });

  test("GET /api/reservations/car/:carId should return reservations for a car", async () => {
    const carId = "6419d65fed4df9b09707839c";
    const response = await request(app).get(`/api/reservations/car/${carId}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /api/reservations/ should return all reservations", async () => {
    const response = await request(app).get("/api/reservations/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("DELETE /api/reservations/:id should remove the created reservation", async () => {
    const response = await request(app).delete(
      `/api/reservations/${testReservationId}`
    );
    expect(response.statusCode).toBe(200);

    // Check if the reservation no longer exists in the database
    const reservation = await Reservation.findById(testReservationId);
    expect(reservation).toBeNull();
  });
});

afterAll((done) => {
  // Close the database connection
  mongoose.connection.close().then(() => {
    console.log("mongoose closed");
    server.close(done);
  });
});
