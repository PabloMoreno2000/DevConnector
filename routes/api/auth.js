const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route  GET api/auth
// @desct  Test route
// @access Public/non-authentication/no-token
// Passing auth will execute the middleware function that will be executed before the callback
router.get("/", auth, async (req, res) => {
  try {
    // The middleware auth modifies the request to have the user id if it has a correct token in the header
    // Do not pass the password.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
