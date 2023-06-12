const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Importing the route module
const route = require('./route/route');

// Creating an instance of Express
const app = express();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Using the imported route module for handling routes
app.use('/', route);

// Connecting to MongoDB
mongoose.connect(process.env.mongodbStr, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err.message));

// Starting the server
app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started on the port:", process.env.PORT || 3000);
});
