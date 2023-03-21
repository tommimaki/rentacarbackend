const server = require("../server");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Car = require("../models/car");

let testCarId;

describe("Car routes", () => {
  test("GET /api/cars/ should return all cars", async () => {
    const response = await request(app).get("/api/cars/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("POST /api/cars/ should create a new car without an image", async () => {
    const newCar = {
      make: "TestMake",
      model: "TestModel",
      year: 2023,
      description: "TestDescription",
      price: "1000",
    };

    const response = await request(app).post("/api/cars/").send(newCar);
    expect(response.statusCode).toBe(201);
    expect(response.body.car).toMatchObject(newCar);
    testCarId = response.body.car.id;
  });

  test("GET /api/cars/:carId should return a single car by ID", async () => {
    const response = await request(app).get(`/api/cars/${testCarId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: testCarId,
      make: "TestMake",
      model: "TestModel",
      year: 2023,
      description: "TestDescription",
      price: "1000",
    });
  });

  test("PUT /api/cars/:carId should edit a car", async () => {
    const updatedCar = {
      make: "UpdatedMake",
      model: "UpdatedModel",
      year: 2024,
      description: "UpdatedDescription",
      price: "1200",
    };

    const response = await request(app)
      .put(`/api/cars/${testCarId}`)
      .send(updatedCar);
    expect(response.statusCode).toBe(200);
    expect(response.body.car).toMatchObject(updatedCar);
  });

  test("DELETE /api/cars/:carId should remove a car", async () => {
    const response = await request(app).delete(`/api/cars/${testCarId}`);
    expect(response.statusCode).toBe(200);

    // Check if the car no longer exists in the database
    const car = await Car.findById(testCarId);
    expect(car).toBeNull();
  });

  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close(done);
    });
  });
});
