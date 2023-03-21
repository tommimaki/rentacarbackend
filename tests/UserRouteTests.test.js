const server = require("../server");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");

let testUserId;

describe("User routes", () => {
  test("GET /api/users/ should return all users", async () => {
    const response = await request(app).get("/api/users/");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("POST /api/users/ should create a new user", async () => {
    const newUser = {
      first_name: "TestFirstName",
      last_name: "TestLastName",
      email: "test@example.com",
      phonenumber: 1234567890,
      password: "testpassword",
    };

    const response = await request(app).post("/api/users/").send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phonenumber: newUser.phonenumber,
    });
    testUserId = response.body.id;
  });

  test("GET /api/users/:id should return a single user by ID", async () => {
    const response = await request(app).get(`/api/users/${testUserId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: testUserId,
      first_name: "TestFirstName",
      last_name: "TestLastName",
      email: "test@example.com",
      phonenumber: 1234567890,
    });
  });

  test("PUT /api/users/:id should update a user", async () => {
    const updatedUser = {
      first_name: "UpdatedFirstName",
      last_name: "UpdatedLastName",
      email: "updated@example.com",
      phonenumber: 1987654321,
    };

    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
  });

  test("DELETE /api/users/:id should delete a user", async () => {
    const response = await request(app).delete(`/api/users/${testUserId}`);
    expect(response.statusCode).toBe(204);

    // Check if the user no longer exists in the database
    const user = await User.findById(testUserId);
    expect(user).toBeNull();
  });

  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close(done);
    });
  });
});
