const express = require("express");
const router = express.Router();

// @route  GET api/posts
// @desct  Test route
// @access Public/non-authentication/no-token
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;
