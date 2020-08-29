const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
// @route  GET api/profile/me
// @desct  Get current user's profile
// @access Private (has to have a token)
router.get("/me", auth, async (req, res) => {
  try {
    // On profile the filed "user" is the user id
    // And then with the id search/populate some fields from the mongoose model "user"
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
