const express = require("express");
const router = express.Router();
// Exporting two objects
const { check, validationResult } = require("express-validator/check");

// @route  POST api/user
// @desct  Test route
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    // Second parameter of check is a custom error message
    // Checks for the value of a json key called "name"
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    // The check is done with the second parameter of above within []
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 is for a bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    res.send("User route");
  }
);

module.exports = router;
