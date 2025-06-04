// ✅ BACKEND – Étape 1 : Connecter le formulaire au backend (authRoutes.js et authController.js)

// 📁 routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { inscrireUtilisateur } = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 🟢 Route POST pour inscription
router.post('/inscription', upload.fields([
  { name: 'pieceIdentite' },
  { name: 'photoPasseport' },
  { name: 'selfie' },
  { name: 'empreinte' },
]), inscrireUtilisateur);

module.exports = router;


// 📁 controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.inscrireUtilisateur = async (req, res) => {
  try {
    const {
      prenom, nom, email, numero, pays, autrePays, nationalite, residence, etat,
      conjoint, dateNaissance, adresse, typeCompte, motdepasse
    } = req.body;

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const newUser = new User({
      prenom, nom, email, numero, pays, nationalite, residence, etat, conjoint,
      autrePays, dateNaissance, adresse, typeCompte,
      motdepasse: hashedPassword,
      pieceIdentite: req.files['pieceIdentite']?.[0]?.filename,
      photoPasseport: req.files['photoPasseport']?.[0]?.filename,
      selfie: req.files['selfie']?.[0]?.filename,
      empreinte: req.files['empreinte']?.[0]?.filename,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur pendant l’inscription.' });
  }
};
