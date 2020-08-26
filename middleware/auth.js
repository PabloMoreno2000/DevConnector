const jwt = require("jsonwebtoken");
const config = require("config");

// next is a callback we have to run once we are done. Typically used in middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    // 401 is not authorized
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    // The previously encoded payload is decoded
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Get the user attribute of the payload, put it in the request
    // The middleware is modifying the request.
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
