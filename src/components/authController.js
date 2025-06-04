// ✅ Vérification OTP + Empreinte
exports.verifyLogin = async (req, res) => {
  try {
    const { email, otp, fingerprint } = req.body;

    if (!email || !otp || !fingerprint) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (user.otp !== otp || new Date() > user.otpExpiresAt) {
      return res.status(401).json({ message: 'OTP invalide ou expiré.' });
    }

    if (user.fingerprint !== fingerprint) {
      return res.status(403).json({ message: 'Empreinte digitale incorrecte.' });
    }

    // Connexion réussie
    user.otp = null;
    user.otpExpiresAt = null;
    user.dernierAcces = new Date();
    await user.save();

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

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
