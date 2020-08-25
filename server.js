const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect database
connectDB();

// Init Middleware
// Ask the server to accept JSON objects in the body of the POST/GET requests
app.use(express.json({ extended: false }));

// If there's no env variable called port, used port 5000
const PORT = process.env.PORT || 5000;

// When a GET response hits the endpoint "/" it will send a response with res.send(), you are prepering the response
// And you can also get the parameters with req.params
// Make a request to "http://localhost:5000" on postman and you'll see
app.get("/", (req, res) => res.send("API Running"));

// Define Routes
// All the routes on ./routes/api/users are behind the main route /api/users
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// THe () => is a callback.
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
