const express = require('express');
const Volunteer = require('../models/Volunteer'); // Mongoose model

const router = express.Router();

// POST /api/volunteer - Save volunteer form data
router.post('/newVolunteer', async (req, res) => {
    try {
        const { name, email, phone, state, city, message } = req.body;

        // Create a new volunteer entry
        const newVolunteer = new Volunteer({
            name,
            email,
            phone,
            state,
            city,
            message,
        });
        console.log(newVolunteer);

        // Save to the database
        await newVolunteer.save();
        res.status(201).json({ message: 'Thank you for volunteering! Your information has been submitted successfully.' });
    } catch (error) {
        console.error('Error saving volunteer data:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// GET /api/volunteers - Fetch all volunteer data
router.get('/all-volunteers', async (req, res) => {
    try {
        // Fetch all documents from the Volunteer collection using Mongoose
        const volunteers = await Volunteer.find({});
        
        // Send the result as a JSON response
        res.status(200).json(volunteers);
    } catch (error) {
        console.error('Error retrieving volunteer data:', error);
        res.status(500).json({ message: 'Failed to fetch volunteer data' });
    }
});


  

module.exports = router;
