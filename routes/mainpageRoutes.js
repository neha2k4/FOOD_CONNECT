const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const MainpageSubscriber = require('../models/MainpageSubscriber');
const { connect } = require('./volunteerRoutes');

// Route to handle subscription form submission
router.post('/subscribe', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    console.log(req.body); 

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists
    const existingSubscriber = await MainpageSubscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }

    const newSubscriber = new MainpageSubscriber({ firstName, lastName, email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error handling subscription:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


 
  
router.post('/mailContact', async (req, res) => {

  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "noreply.foodconnect@gmail.com",
        pass: "ygqvcwpxlgwolyur",
      },
    });
    

  try {
    const { firstName, lastName, email } = req.body;


    const newSubscriber = new MainpageSubscriber({
    firstName, 
    lastName, 
    email
  });
 

 
      // Save to the database
      const info = await transporter.sendMail({
          from: '"FoodConnect New Subscriber" <noreply.foodconnect@gmail.com>', // sender address
          to: `mwalia_be22@thapar.edu`, // list of receivers
          subject: "New Subscriber Registered", // Subject line
          text: "New Subscriber", // plain text body
          html: `
              <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
                  <table style="width: 100%; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                      <thead style="background-color: #f4f4f4;">
                          <tr>
                              <th colspan="2" style="padding: 15px; font-size: 20px; text-align: center; color: #4CAF50;">
                                  New Subscriber Registered in FoodConnect
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Name:</td>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${firstName}</td>
                          </tr>
                          <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Email:</td>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                          </tr>
                          <tr>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Phone:</td>
                              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lastName}</td>
                          </tr>
                        
                      </tbody>
                  </table>
                  <footer style="text-align: center; padding: 15px; background-color: #f4f4f4; font-size: 12px; color: #888;">
                      <p>FoodConnect | Reducing Food Insecurity</p>
                      <p>For more details, visit our platform.</p>
                  </footer>
              </div>
          `
      });
      
      
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ 
          message: "Subscriber successfully registered and email sent.", 
          contact: newSubscriber 
      });
  } catch (error) {
      console.error('Error saving Subscriber data:', error);
      res.status(500).json({ 
          message: "Failed to register Subscriber or send email. Please try again later.", 
          error: error.message 
      });
  }
});
 
module.exports = router;
