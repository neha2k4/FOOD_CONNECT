const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donationAmt: { type: Number, required: true },
  frequency: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  addressLines: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  email: { type: String, required: true },
  confirmEmail: { type: String, required: true },
  phone: { type: String },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
}, { timestamps: true, collection: 'donations'});

module.exports = mongoose.model("Donation", donationSchema);
