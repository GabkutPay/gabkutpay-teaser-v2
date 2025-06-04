const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Configuration du transporteur email (à externaliser dans un fichier séparé)
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Configuration OTP (à mettre dans les variables d'environnement)
const OTP_CONFIG = {
  length: 6,
  expiry: 10 * 60 * 1000, // 10 minutes en ms
  options: {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  },
};

// Helper pour envoyer les emails
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `Gabkut Pay <${process.env.MAIL_USER}>`,
    to: email,
    subject: '🔒 Votre code de vérification Gabkut Pay',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a237e;">Bienvenue sur Gabkut Pay !</h2>
        <p>Votre code de vérification est :</p>
        <div style="font-size: 24px; letter-spacing: 3px; margin: 20px 0; padding: 10px; background: #f0f4ff; display: inline-block;">
          ${otp}
        </div>
        <p style="color: #666;">Ce code expirera dans 10 minutes.</p>
        <hr style="border: 1px solid #eee;">
        <p style="font-size: 12px; color: #999;">Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Route d'inscription améliorée
router.post('/register', async (req, res, next) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Validation renforcée
    if (!nom?.trim() || !prenom?.trim() || !email?.trim() || !motDePasse) {
      return res.status(400).json({ 
        code: 'MISSING_FIELDS',
        message: 'Tous les champs sont obligatoires' 
      });
    }

    if (motDePasse.length < 8) {
      return res.status(400).json({
        code: 'WEAK_PASSWORD',
        message: 'Le mot de passe doit contenir au moins 8 caractères',
      });
    }

    // Vérification existence utilisateur
    const existingUser = await User.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingUser) {
      return res.status(409).json({
        code: 'EMAIL_EXISTS',
        message: 'Un compte existe déjà avec cette adresse email',
      });
    }

    // Génération OTP sécurisé
    const otp = otpGenerator.generate(
      OTP_CONFIG.length, 
      OTP_CONFIG.options
    );
    
    const otpExpiresAt = new Date(Date.now() + OTP_CONFIG.expiry);

    // Création utilisateur
    const hashedPassword = await bcrypt.hash(motDePasse, 12);
    
    const newUser = new User({
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.toLowerCase().trim(),
      motDePasse: hashedPassword,
      otp,
      otpExpiresAt,
      historiqueConnexion: [{
        date: new Date(),
        type: 'INSCRIPTION',
      }],
    });

    // Transaction simulée
    await newUser.save();
    await sendOTPEmail(email, otp);

    // Réponse sécurisée (ne pas renvoyer de données sensibles)
    return res.status(201).json({
      success: true,
      message: 'Vérifiez votre email pour activer votre compte',
      data: {
        userId: newUser._id,
        email: newUser.email,
        expiresAt: otpExpiresAt,
      },
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erreur inscription :`, error);
    
    // Gestion des erreurs email
    if (error.code === 'EENVELOPE') {
      await User.deleteOne({ email: req.body.email });
      return res.status(502).json({
        code: 'EMAIL_FAILURE',
        message: 'Échec de l\'envoi de l\'email de vérification',
      });
    }

    next(error);
  }
});

module.exports = router;
