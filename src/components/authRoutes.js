const User = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');
const jwt = require('jsonwebtoken');

exports.verifyLogin = async (req, res) => {
  try {
    const { email, otp, fingerprint } = req.body;

    // Validation des champs obligatoires
    if (!email || !otp || !fingerprint) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Recherche utilisateur par email normalisé
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification de la validité et expiration de l’OTP
    const otpValide = user.otp === otp;
    const otpNonExpire = user.otpExpiresAt && new Date() <= user.otpExpiresAt;

    if (!otpValide || !otpNonExpire) {
      return res.status(401).json({ message: 'OTP invalide ou expiré.' });
    }

    // Vérification de l’empreinte digitale
    if (user.fingerprint !== fingerprint) {
      return res.status(403).json({ message: 'Empreinte digitale incorrecte.' });
    }

    // Génération du token JWT avec expiration à 7 jours
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Nettoyage des champs OTP et mise à jour du dernier accès
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.dernierAcces = new Date();
    await user.save();

    // Enregistrement de la tentative de connexion
    await LoginAttempt.create({
      email: user.email,
      ip: req.ip,
      fingerprint,
      date: new Date()
    });

    // Réponse avec token et données utilisateur (sans mot de passe)
    res.status(200).json({
      message: 'Connexion réussie.',
      token,
      utilisateur: {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Erreur vérification OTP :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
