const request = require("supertest");
const app = require("../server"); // Import your app

const Reservation = require("../models/reservation");

describe("Reservation routes", () => {
  // Test POST / route
  test("POST / should create a new reservation", async () => {
    const newReservation = {
      user: "testUser",
      carId: "testCarId",
      carMake: "testCarMake",
      carModel: "testCarModel",
      startDate: "2023-04-01",
      endDate: "2023-04-05",
      totalPrice: 200,
    };

    const response = await request(app).post("/").send(newReservation);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newReservation);
    // Clean up: delete the created reservation
    await Reservation.deleteOne({ _id: response.body._id });
  });

  // Test GET /car/:carId route
  test("GET /car/:carId should return reservations for a car", async () => {
    const carId = "testCarId";
    const response = await request(app).get(`/car/${carId}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Test GET / route
  test("GET / should return all reservations", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Add more test cases for other routes
});
