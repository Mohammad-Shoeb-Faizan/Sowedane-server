// routes/signin.js
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "my-secret-key",
      { expiresIn: "1h" }
    );

    req.session.user = {
      userId: user._id,
      email: user.email,
    };

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
