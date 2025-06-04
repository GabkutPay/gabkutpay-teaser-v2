const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ⏱️ Durée de validité du code (en ms)
const CODE_VALIDITY_DURATION = 5 * 60 * 1000; // 5 minutes

router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Email et code requis.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !user.code2FA || !user.code2FAExpiresAt) {
      return res.status(400).json({ success: false, message: 'Aucun code 2FA trouvé.' });
    }

    const isCodeValid = user.code2FA === code;
    const isNotExpired = new Date() <= user.code2FAExpiresAt;

    if (!isCodeValid || !isNotExpired) {
      return res.status(401).json({ success: false, message: 'Code invalide ou expiré.' });
    }

    // ✅ Code correct : on peut nettoyer les champs temporaires
    user.code2FA = null;
    user.code2FAExpiresAt = null;
    await user.save();

    return res.status(200).json({ success: true, message: '2FA validé.' });
  } catch (error) {
    console.error('Erreur vérification 2FA :', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

module.exports = router;
