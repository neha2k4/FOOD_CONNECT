const express = require("express");
const Donation = require("../models/Donation"); // Ensure path to model file is correct
const router = express.Router();

// Donation route
router.post("/donate", async (req, res) => {
  try {
    const donationData = req.body;

    const newDonation = new Donation(donationData);
    await newDonation.save();

    res.status(201).json({ message: "Thank you for your donation!" });
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ message: "Error processing donation. Please try again later." });
  }
});

module.exports = router;
