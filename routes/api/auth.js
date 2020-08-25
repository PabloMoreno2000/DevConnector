const express = require("express");
const router = express.Router();

// @route  GET api/auth
// @desct  Test route
// @access Public/non-authentication/no-token
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
