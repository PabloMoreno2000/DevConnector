const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// Exporting two objects
const { check, validationResult } = require("express-validator/check");

// Returns a moongose model of the user
const User = require("../../models/User");

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
  async (req, res) => {
    // The check is done with the second parameter of above within []
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 is for a bad request
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;

    try {
      // Check if there's a user with that email (since we put emails as unique)
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", // rate
        d: "mm", // like an image?
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // 10 is recommended in documentation, the bigger the number means more security
      const salt = await bcrypt.genSalt(10);
      // Encrypt the password
      user.password = await bcrypt.hash(password, salt);
      // Remember that User is a moongose model and we connected moongose with our database
      await user.save();
      // TODO: Return jsonwebtoken (useful to log in users right away when registered)

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
