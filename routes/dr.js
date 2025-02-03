const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation'); // Adjust path based on your folder structure

// adding to check git 

// POST route to handle donation submissions
router.post('/donation', async (req, res) => {
  try {
    // Destructure and validate request body data
    const {
      donationAmt,
      fullName,
      address,
      email,
      confirmEmail,
      phone,
      paymentInfo
    } = req.body;

    // Check that email and confirmEmail match
    if (email !== confirmEmail) {
      return res.status(400).json({ success: false, message: 'Email addresses do not match.' });
    }

    // Create a new Donor document with the request data
    const newDonation = new Donation({
      donationAmt,
      fullName: {
        firstName: fullName.firstName,
        middleName: fullName.middleName,
        lastName: fullName.lastName
      },
      address: {
        state: address.state,
        country: address.country,
        addressLines: address.addressLines,
        city: address.city,
        postalCode: address.postalCode
      },
      email,
      confirmEmail,
      phone,
      paymentInfo: {
        cardNumber: paymentInfo.cardNumber,
        expirationDate: paymentInfo.expirationDate,
        cvv: paymentInfo.cvv
      }
    });

    // Save the new donor record to the database
    await newDonor.save();
    res.status(201).json({ success: true, message: 'Donation successfully recorded!' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing your donation.' });
  }
});

 
module.exports = router;
