const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.Mongo_URI || 'mongodb://localhost:27017/foodconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const donationsRoute = require('./routes/donation.js');
const contactUsRoute = require('./routes/ContactUsR.js');
const foodShelterRoutes = require('./routes/foodShelterRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const mainpageRoutes = require('./routes/mainpageRoutes');

app.use('/api/donations', donationsRoute);
app.use('/api/contact', contactUsRoute);
app.use('/api/food-shelter', foodShelterRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api', mainpageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


