// routes/myprofile.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

router.get("/myprofile", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userEmail = decodedToken.email;

      const userProfile = await User.findOne({ email: userEmail });

      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(userProfile);
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
