// ContactUsR.js

const express = require('express');
const Contact = require('../models/Contact'); 
const nodemailer = require("nodemailer");// Import the Contact model

const router = express.Router();

// POST /api/contact/newContact - Save contact form data
router.post('/newContact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Create a new contact entry
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        // Save to the database
        await newContact.save();
        res.status(201).json({ message: 'Thank you for contacting us! Your message has been received.' });
    } catch (error) {
        console.error('Error saving contact data:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
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
        const { name, email, phone, subject, message } = req.body;

        // Create a new contact entry
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        // Save to the database
        const info = await transporter.sendMail({
            from: '"FoodConnect New Contact" <noreply.foodconnect@gmail.com>', // sender address
            to: `mwalia_be22@thapar.edu`, // list of receivers
            subject: "New Contact Registered", // Subject line
            text: "New Contact", // plain text body
            html: `
                <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333;">
                    <table style="width: 100%; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <thead style="background-color: #f4f4f4;">
                            <tr>
                                <th colspan="2" style="padding: 15px; font-size: 20px; text-align: center; color: #4CAF50;">
                                    New Contact Registered in FoodConnect
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Name:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Phone:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; text-align: right;">Subject:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-weight: bold; text-align: right;">Message:</td>
                                <td style="padding: 10px;">${message}</td>
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
            message: "Contact successfully registered and email sent.", 
            contact: newContact 
        });
    } catch (error) {
        console.error('Error saving contact data:', error);
        res.status(500).json({ 
            message: "Failed to register contact or send email. Please try again later.", 
            error: error.message 
        });
    }
});

module.exports = router;
