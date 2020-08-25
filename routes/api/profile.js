const express = require("express");
const router = express.Router();

// @route  GET api/profile
// @desct  Test route
// @access Public/non-authentication/no-token
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
