const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  otp: String,
  otpExpiresAt: Date,
  estVerifie: { type: Boolean, default: false },
  dateInscription: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
