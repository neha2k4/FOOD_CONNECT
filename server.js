// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Options
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Import Routes
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/ContactUsR');
const foodShelterRoutes = require('./routes/foodShelterRoutes'); 
const donationRoutes = require('./routes/donationRoutes')
const mainPageRoutes = require('./routes/mainpageRoutes')
// Routes for food shelters
// const subscriberRoutes = require('./routes/subscriberRoutes'); // Routes for subscriber forms

// Use Routes
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/food-shelter', foodShelterRoutes); 
app.use('/api/donations', donationRoutes); 
app.use('/api/mainpage', mainPageRoutes); 
  
// app.use('/api/subscriber', subscriberRoutes); // Subscriber form submissions

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




 
