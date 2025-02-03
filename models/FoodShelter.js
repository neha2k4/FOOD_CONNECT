// models/FoodShelter.js
const mongoose = require('mongoose');

const foodShelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

   
}, 
{
    timestamps: true,
    collection: 'foodshelter'
}, );

const FoodShelter = mongoose.model('FoodShelter', foodShelterSchema);

module.exports = FoodShelter;
