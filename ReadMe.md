Car Rental Back End
This is the back end for a car rental website. It is built with Node.js and Express.js, and uses MongoDB for data storage. The back end provides RESTful API endpoints for user authentication, user profile data, car data, and reservation data.

Getting Started
To get started with the back end, follow these steps:

Clone the repository to your local machine.
Install dependencies by running npm install.
Create a .env file and add your MongoDB connection string as MONGODB_URI.
Run the server with npm start.
API Endpoints
Authentication
POST /api/auth
Authenticate a user with an email and password.

Request
bash
Copy code
POST /api/auth
Content-Type: application/json

{
"email": "example@example.com",
"password": "password123"
}
Response
bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
"token": "jwt_token_here",
"userId": "user_id_here",
"isAdmin": true
}
User Profile
GET /api/user/:userId
Get a user's profile data.

Request
sql
Copy code
GET /api/user/user_id_here
Authorization: Bearer jwt_token_here
Response
bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
"firstName": "John",
"lastName": "Doe",
"email": "example@example.com",
"phoneNumber": "123-456-7890",
"isAdmin": true
}
PUT /api/user/:userId
Update a user's profile data.

Request
bash
Copy code
PUT /api/user/user_id_here
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
"firstName": "John",
"lastName": "Doe",
"email": "example@example.com",
"phoneNumber": "123-456-7890",
"password": "password123"
}
Response
css
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
"message": "User profile updated"
}
Cars
GET /api/cars
Get all cars.

Request
bash
Copy code
GET /api/cars
Response
bash
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

[
{
"make": "Toyota",
"model": "Camry",
"year": 2022,
"pricePerDay": 50,
"isAvailable": true,
"_id": "car_id_here"
}
]
POST /api/cars
Add a new car.

Request
bash
Copy code
POST /api/cars
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
"make": "Toyota",
"model": "Camry",
"year": 2022,
"pricePerDay": 50
}
Response
css
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
"message": "Car added"
}
Reservations
GET /api/reservations
Get all reservations.

Request
sql
Copy code
GET /api/reservations
Authorization: Bearer jwt_token_here
