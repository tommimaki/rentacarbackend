# Car Rental Back End

Backend Hosted on fly io: https://carback.fly.dev/

Frontend repo here: https://github.com/tommimaki/rentacar
Frontend hosted here: https://steady-lollipop-d552c8.netlify.app/

### This is the back end for a car rental website. <br /> It is built with Node.js and Express.js, and uses MongoDB for data storage. <br /> The back end provides RESTful API endpoints for user authentication, user profile data, car data, and reservation data.

### Features

- Crud functions for reservations, users, and cars.
- User authentication with jsonwebtoken
- Data is saved on a NoSQL DB on MongdoDB
- Supertest for test API routes and HTTP requests
- Multer to handle image uploads

### Getting Started

To get started with the back end, follow these steps:

- Clone the repository to your local machine.
- Install dependencies by running npm install.
- Create a .env file and add your MongoDB connection string as MONGODB_URI.
- Run the server with npm start.
