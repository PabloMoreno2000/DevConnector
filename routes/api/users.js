const express = require("express");
const router = express.Router();

// @route  GET api/user
// @desct  Test route
// @access Public/non-authentication/no-token
router.get("/", (req, res) => res.send("User route"));

module.exports = router;
