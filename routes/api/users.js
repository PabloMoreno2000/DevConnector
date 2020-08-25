const express = require("express");
const router = express.Router();

// @route  POST api/user
// @desct  Test route
// @access Public/non-authentication/no-token
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("User route");
});

module.exports = router;
