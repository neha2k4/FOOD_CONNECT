const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const foodshelter = require('../models/FoodShelter');

// Define the FoodShelter schema
// const FoodShelterSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     password: String,
// });
// const FoodShelter = mongoose.model('FoodShelter', FoodShelterSchema);

// Sign-up route
router.post('/signup', async (req, res) => {
    const { name, email, phone, password, address} = req.body;
    console.log(req.body); 

    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newShelter = new foodshelter({
            name,
            email,
            phone,
            password: hashedPassword,  
            address// Save the hashed password
        });

        await newShelter.save();
        res.status(201).json({ message: 'Food shelter registered successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering shelter.' });
    }
});

// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const shelter = await foodshelter.findOne({ email });
        if (!shelter) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, shelter.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Sign-in successful.' });
    } catch (error) {
        res.status(400).json({ message: 'Error during sign-in.' });
    }
});

// API route to fetch food shelter data
router.get('/fetch', async (req, res) => {
console.log("here"); 
    try {
        const shelters = await foodshelter.find();
        res.json(shelters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
