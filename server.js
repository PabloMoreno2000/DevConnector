const express = require("express");
const conenctDB = require("./config/db");
const connectDB = require("./config/db");
const app = express();

// Connect database
connectDB();

// If there's no env variable called port, used port 5000
const PORT = process.env.PORT || 5000;

// When a GET response hits the endpoint "/" it will send a response with res.send(), you are prepering the response
// And you can also get the parameters with req.params
// Make a request to "http://localhost:5000" on postman and you'll see
app.get("/", (req, res) => res.send("API Running"));

// THe () => is a callback.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
