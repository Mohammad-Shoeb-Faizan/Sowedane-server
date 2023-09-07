// routes/updateProfile.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/update-profile", async (req, res) => {
  const { email, fullName, phone, address, companyName } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { fullName, phone, address, companyName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
